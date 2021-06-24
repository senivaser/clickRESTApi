//Подключение всех модулей для единого доступа через handlers

module.exports = {
  ...require('./handlerRegister'),
  ...require('./handlerUsers'),
  ...require('./handlerUserId'),
  ...require('./handlerStats'),
  ...require('./handlerCleanup')
}