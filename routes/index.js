const { handlerRegister, handlerUsers, handlerUserId, handlerStats, handlerCleanup } = require("../handlers")


module.exports = (fastify, opts, done) => {

  const authOpts = {
      onRequest: fastify.auth([fastify.basicAuth])
  }

  fastify.post('/register', handlerRegister)

  fastify.get('/users', authOpts, handlerUsers)

  fastify.get('/user/:id', authOpts, handlerUserId)

  fastify.get('/stats', authOpts, handlerStats)

  fastify.post('/cleanup', authOpts, handlerCleanup)
  
  done()

}