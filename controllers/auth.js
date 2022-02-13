const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { generateJWT } = require('../helpers/generateJWT')
const { googleVerify } = require('../helpers/googleVerify')

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

/**
 * Google sign in
 */ 

const googleSignIn = async ( req, res ) => {
  const { g_token } = req.body 

  try{
    const { name, img, email } = await googleVerify(g_token)

    let user = await User.findOne({ email })
    
    // If user doesn't exists, create new 
    if( !user ) {
      const data = {
        name,
        email, 
        img,
        password: ':)',
        google: true,
      }

      user = new User(data)
      await user.save()
    }

    // Verify if user is active
    if ( !user.isActive ) {
      return res.status(401).json({
        message: 'Blocked user'
      })
    }

    // Generate token 
    const token = generateJWT( user.id )

    res.json({
      message: 'Signed in with Google',
      token
    })
  }catch( err ) {
    console.error(err)
    return res.status(400).json({
      message: 'Invalid Google token'
    })
  }
}

module.exports = {
  login,
  googleSignIn
}
