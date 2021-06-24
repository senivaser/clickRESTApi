const generator = require('generate-password')

//Конструктор сервера, генерация id случайна для отсутствия повторения id запроса
const fastify = require('fastify')({
  logger: true,
  genReqId: function (req) { return generator.generate({length: 7}) }
})

//Обеспечение для 'fastify-basic-auth'
const { validate, authenticate } = require('./middleware/auth')
//Аккумулятор запросов
const requestAccumulator = require('./middleware/requestAccumulator')
//Порт сервера
const PORT = require('./constants').PORT

//'fastify-auth' и 'fastify-basic-auth' для базовой авторизации
fastify.register(require('fastify-auth'))
fastify.register(require('fastify-basic-auth'), { validate, authenticate })

//Данный блок работает с подключенными 'fastify-auth' и 'fastify-basic-auth'
fastify.after(() => {
  //Routes
  fastify.register(require('./routes'))

  //Аккумулятор зацеплен за хуком 'onResponse' ввиду того, что 
  //в этом случится он выполнится ПОСЛЕ отправки ответа 
  fastify.addHook('onResponse', requestAccumulator)
})

//Surprise
fastify.get('/hi', (req, res) => {
  res.send({
    "hi": "there"
  })
})

//Запуск сервера на PORT
const start = async () => {
  try {
    await fastify.listen(PORT)
  } catch(err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()