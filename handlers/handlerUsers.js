const db = require('../models')
const errorCreated = require('../utils/errorCreated')

module.exports.handlerUsers = async (req, res) => {
  
  //Получение списка User из mongodb 
  let users
  try {
    users = await db.User.find({}, {
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

  res.status(200).send(users)

}