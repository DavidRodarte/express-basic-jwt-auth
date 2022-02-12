
/**
 * Is Admin middleware 
 */
const isAdmin = ( req, res, next ) => {
  /*
   * If for some reason the last verification
   * middleware doesn't return current user
   */
  if( !req.user ){
    return res.status(500).json({
      message: 'Invalid user validation'
    })
  }

  const { role } = req.user 

  if( role != 'ADMIN' ) {
    return res.status(401).json({
      message: 'Unauthorized user'
    })
  }

  next()
}

/**
 * Has role middleware
 *
 */ 

const hasRole = ( ...requiredRoles ) => {
  return (req, res, next) => {
    /*
     * If for some reason the last verification
     * middleware doesn't return current user
     */
    if( !req.user ){
      return res.status(500).json({
        message: 'Invalid user validation'
      })
    }

    /**
     * If user role is not included
     */
    if( !requiredRoles.includes(req.user.role) ) {
      return res.status(401).json({

        message: `Invalid role, this route requires ${requiredRoles}`
      })
    }

    next()
  }
}

module.exports = {
  isAdmin,
  hasRole
}
