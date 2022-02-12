const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { generateJWT } = require('../helpers/generateJWT')

/*
 * Login
 * @param req 
 * @param res
 */
const login = async ( req, res ) => {

  const { email, password } = req.body
  
  try{
    //Verify if user exists 
    const user = await User.findOne({email})

    if( !user ){
      return res.status(400).json({
        message: 'Wrong credentials'
      })
    }

    //Verify if user is active
    if ( !user.isActive ){
      return res.status(400).json({
        message: 'Blocked user'
      })
    }

    // Verify password 
    const validPassword = bcryptjs.compareSync(password, user.password)

    if( !validPassword ) {
      return res.status(400).json({
        message: 'Wrong credentials'
      })
    }

    // Generate JWT
    const token = await generateJWT( user.id ) 

    res.json({
      user,
      token
    })

  }catch(err){
    console.error(err)
    return res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

module.exports = {
  login
}
