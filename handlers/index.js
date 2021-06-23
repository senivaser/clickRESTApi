module.exports = {
  ...require('./handlerRegister'),
  ...require('./handlerUsers'),
  ...require('./handlerUserId'),
  ...require('./handlerStats'),
  ...require('./handlerCleanup')
}