const db = require('../models')
const errorCreated = require('../utils/errorCreated')

module.exports.handlerStats = async (req, res) => {
  
  //Отображение статистики по Request из mongodb
  let stats
  try {
    //Группировка по route через aggregate().group
    stats = await db.Request.aggregate().group({
      _id:{ "route": "$route" },
      count: {"$sum": 1},
      avg_time: {"$avg": "$responseTime"}
    })
  } catch (err) {
    //Ошибка запроса в mongodb

    //log для разработчика
    console.log(err)
    throw errorCreated('Server issues', 500)
  }
  
  //Отправка статистики
  res.send(stats || {})
}