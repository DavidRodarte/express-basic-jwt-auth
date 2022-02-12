const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = async ( req, res, next ) => {

  const token = req.header('x-token')

  if( !token ){
    return res.status(401).json({
      message: 'Missing token'
    })
  }

  console.log(token)


  try{
    const { uid } = jwt.verify(token, process.env.SECRET_KEY)

    const user = await User.findById(uid)
    
    // User doesn't exist
    if( !user ) {
      return res.status(401).json({
        message: 'Invalid user'
      })

    }
    // If user is not active
    if( !user.isActive ) {
      return res.status(401).json({
        message: 'Inactive user'
      })

    }
    // Add the authenticated user to request 
    req.user = user

    next()
  }catch( err ) {
    console.error(err) 
    res.status(500).json({
      message: 'Error while generating token'
    })
  }

}

module.exports = {
  validateJWT
}
