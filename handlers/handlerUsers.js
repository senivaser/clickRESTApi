const db = require('../models')
const errorCreated = require('../utils/errorCreated')

module.exports.handlerUsers = async (req, res) => {
  
  let users
  try {
    users = await db.User.find({}, {
      "_id": 0,
      "id": 1,
      "username": 1,
      "createdAt": 1
    })
  } catch (err) {
    console.log(err)
    throw errorCreated('Server issues', 500)
  }


  if (users) {    
    res.status(200).send(users)
  } else {
    throw errorCreated('Server issues', 500)
  }

}