const db = require('../models')
const errorCreated = require('../utils/errorCreated')

module.exports.handlerUserId = async (req, res) => {
  
  //Проверка на существования параметра :id
  const id = req.params.id
  if (!id){
    throw errorCreated('Wrong URL', 404)
  }

  //Получение User из mongodb
  let user
  try {
    user = await db.User.findOne({id}, {
      "_id": 0,
      "id": 1,
      "username": 1,
      "createdAt": 1
    })
  } catch (err) {
    //Ошибка запроса в mongodb

    //log для разработчика
    console.log(err)
    throw errorCreated('Server issues', 500)
  }

  //Отображение полученного User
  if (user) {    
    res.status(200).send(user)
  } else {
    //Если не найден в БД
    throw errorCreated('User has not found', 404)
  }
}