const db = require('../models')
const errorCreated = require('../utils/errorCreated')

module.exports.handlerStats = async (req, res) => {
  
  let stats
  try {
    stats = await db.Request.aggregate().group({
      _id:{ "route": "$route" },
      count: {"$sum": 1},
      avg_time: {"$avg": "$responseTime"}
    })
  } catch (err) {
    console.log(err)
    throw errorCreated('Server issues', 500)
  }
    
  res.send({
    stats
  })
}