const db = require('../models')
const errorCreated = require('../utils/errorCreated')

//Отметка проверки header 'WWW-Authentication'
module.exports.authenticate = true

//Валидация для basic auth
module.exports.validate = async (username, password, req, res, done) => {

  //Проверка заполнения
  if (!username || !password) {
    return errorCreated('Bad authentication format', 401)
  } else {
    
    //Неправильный username или password
    const lpError = errorCreated('Wrong username or password', 401)
    
    //Проверка наличия User в mongodb
    const user = await db.User.findOne({username})
    if (!user) {
      return lpError
    }
    
    //Проверка пароля через функцию из модели данного user
    const valid = await user.comparePassword(password)
    if (!valid) {
      return lpError
    }

    //Далее в handler передается информация о аунтефикации
    req.auth = {
      username: username.toLowerCase(),
      valid
    }
  }

  done()  
}

