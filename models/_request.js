const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
  reqId: {
      type: String,
      required: true,
      unique: true,
  },
  route: {
    type: String,
    required: true
  },
  responseTime: {
      type: Number,
      required: true
  },
  executedAt: {
      type: Date,
      default: Date.now()
  }
  
})

module.exports = mongoose.model('Request', requestSchema)