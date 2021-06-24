const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
  reqId: {
      type: String,
      required: true,
      unique: true,
  },//request Id
  route: {
    type: String,
    required: true
  },//route
  responseTime: {
      type: Number,
      required: true
  },//время ответа
  executedAt: {
      type: Date,
      default: Date.now()
  }//выполнен
  
})

module.exports = mongoose.model('Request', requestSchema)