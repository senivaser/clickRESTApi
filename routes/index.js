const { handlerRegister, handlerUsers, handlerUserId, handlerStats, handlerCleanup } = require("../handlers")


module.exports = (fastify, opts, done) => {

  //Опция, требующая авторизацию для корректного ответа на запрос
  const authOpts = {
      onRequest: fastify.auth([fastify.basicAuth])
  }

  //Список routes
  fastify.post('/register', handlerRegister)

  fastify.get('/users', authOpts, handlerUsers)

  fastify.get('/user/:id', authOpts, handlerUserId)

  fastify.get('/stats', authOpts, handlerStats)

  fastify.post('/cleanup', authOpts, handlerCleanup)
  
  done()

}