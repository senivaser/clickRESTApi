const db = require('../models')
const errorCreated = require('../utils/errorCreated')
const generator = require('generate-password')


module.exports.handlerRegister = async (req, res) => {

  /*
    Предпологаемое тело запроса
    {
      username: String,
      password: String
    }
  */

  //Парс тела запроса
  let {
    username,
    password
  } = req.body

  //Регистрация User в mongodb
  let user
  try {
    user = await db.User.create({
      username: username.toLowerCase(),
      password,

      //генерация id User для запроса /user/:id
      id: generator.generate({length:7}) 
    })
  } catch (err) {
    //Ошибка создания User в mongodb

    //log для разработчика
    console.log(err)
    if (err.code === 11000) {
      //Ошибка, когда User уже создан
      throw errorCreated('User has already exist', 403)
    }
    throw errorCreated('Server issues', 500)
  }
  
  //Отображение созданного User
  res.status(201).send({ id: user.id, username: user.username })
 
}