const Role = require('../models/role')
const User = require('../models/user')

/**
 * Check if role exists in database
 */
const roleExists = async (role = '') => {
  const findRole = await Role.findOne({ role })
  if( !findRole ) {
    throw new Error(`${role} is not a valid role`)
  }
}

/**
 * Check if email is already registered in database
 */
const emailExists = async ( email = '' ) => {
  const findEmail = await User.findOne({email})

  if( findEmail ) {
    throw new Error(`Email ${email} is already registered`)
  }
}

/**
 * Check if user exists 
 */ 
const userExists = async( id ) => {
  const findUser = await User.findById(id)
  if( !findUser ) {
    throw new Error(`User with id ${id} not found`)
  }
}


module.exports = {
  roleExists,
  emailExists,
  userExists
}
