//Настройка mongodb
const mongoose = require('mongoose')
const DATABASE = require('../constants').DATABASE

mongoose.set('debug', true)
mongoose.Promise = global.Promise

mongoose.connect(DATABASE)

//Единый импорт моделей для models
module.exports.User = require('./_user')
module.exports.Request = require('./_request')