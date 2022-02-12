const bcryptjs = require('bcryptjs')

/**
 * Generates hash from string 
 * @param string
 * @returns String
 */
const hash = ( string ) => {
  // Bcrypt password 
  const salt = bcryptjs.genSaltSync()
  return bcryptjs.hashSync( string , salt )
}

module.exports = hash
