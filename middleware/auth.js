const db = require('../models')
const errorCreated = require('../utils/errorCreated')

module.exports.authenticate = true

module.exports.validate = async (username, password, req, res, done) => {

  if (!username || !password) {
    return errorCreated('Bad authentication format', 401)
  } else {
    
    const lpError = errorCreated('Wrong login or password', 401)
    
    const user = await db.User.findOne({username})
    if (!user) {
      return lpError
    }
    
    const valid = await user.comparePassword(password)
    if (!valid) {
      return lpError
    }

    req.auth = {
      username: username.toLowerCase(),
      valid
    }
  }

  done()  
}

