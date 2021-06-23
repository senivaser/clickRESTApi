const db = require('../models')
const errorCreated = require('../utils/errorCreated')

module.exports.handlerUserId = async (req, res) => {
  
  req.url = '/user:id'
  console.log(req)

  const id = req.params.id
  if (!id){
    throw errorCreated('Wrong URL', 404)
  }

  let user
  try {
    user = await db.User.findOne({id}, {
      "_id": 0,
      "id": 1,
      "username": 1,
      "createdAt": 1
    })
  } catch (err) {
    console.log(err)
    throw errorCreated('Server issues', 500)
  }


  if (user) {    
    res.status(200).send(user)
  } else {
    throw errorCreated('User has not found', 404)
  }
}