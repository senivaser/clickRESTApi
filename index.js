const generator = require('generate-password')

const fastify = require('fastify')({
  logger: true,
  genReqId: function (req) { return generator.generate({length: 7}) }
})

const { validate, authenticate } = require('./middleware/auth')
const requestAccumulator = require('./middleware/requestAccumulator')
const PORT = require('./constants').PORT

fastify.register(require('fastify-auth'))
fastify.register(require('fastify-basic-auth'), { validate, authenticate })

fastify.after(() => {
  fastify.register(require('./routes'))
  fastify.addHook('onResponse', requestAccumulator)
})


fastify.get('/', (req, res) => {
  res.send({
    "hi": "there"
  })
})

const start = async () => {
  try {
    await fastify.listen(PORT)
  } catch(err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()