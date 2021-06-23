const db = require('../models')
const errorCreated = require('../utils/errorCreated')

module.exports = async (req, res) => {
  console.log('req.id: ', req.id, req.url)
  
  try {
    const response = await db.Request.create({
      reqId: req.id,
      route: req.context.config.url,
      responseTime: res.getResponseTime()
    })
    console.log(response)
  } catch (err) {
    console.log(err)
    throw errorCreated('Server issues', 500)
  }

}