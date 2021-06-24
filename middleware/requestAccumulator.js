const db = require('../models')
const errorCreated = require('../utils/errorCreated')

module.exports = async (req, res) => {
  
  //Создание записи в базе о запросе (Request)
  try {
    const response = await db.Request.create({
      reqId: req.id,
      route: req.context.config.url, //Здесь хранится путь-строка непосредственно из route
      responseTime: res.getResponseTime() //Время ответа на запрос
    })
  } catch (err) {
    //Ошибка запроса в mongodb

    //log для разработчика
    console.log(err)
    throw errorCreated('Server issues', 500)
  }

}