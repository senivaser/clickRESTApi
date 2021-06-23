const db = require('../models')
const errorCreated = require('../utils/errorCreated')
const generator = require('generate-password')


module.exports.handlerRegister = async (req, res) => {

  const {
    username,
    password
  } = req.body

  let user
  try {
    user = await db.User.create({
      username: username.toLowerCase(),
      password,
      id: generator.generate({length:7})
    })
  } catch (err) {
    console.log(err)
    if (err.code === 11000) {
      throw errorCreated('User has already exist', 403)
    }
    throw errorCreated('Server issues', 500)
  }
  
  if (user) {
    
    const { id, username } = user
    res.status(201).send({ id, username })
  } else {
    throw errorCreated('Server issues', 500)
  }

  
}