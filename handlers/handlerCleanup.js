const db = require('../models')
const errorCreated = require('../utils/errorCreated')

module.exports.handlerCleanup = async (req, res) => {
  
  //Очистка Users в mongodb
  try {
    await db.User.deleteMany()
  } catch (err) {
    
    //Ошибка очистки в mongodb

    //log для разработчика
    console.log(err)

    throw errorCreated('Server issues', 500)
  }

  //Отправка
  res.status(202).send({"message": "All users has been deleted"})

}