const { validationResult } = require('express-validator')
const User = require('../models/user')
const hash = require('../helpers/hash')

/**
 * Get active users with total count
 */
const getUser = async ( req, res ) => {
  const { limit = 5, from = 0 } = req.query 

  const query = { isActive: true }

  const [users, total] = await Promise.all([
     User.find(query).skip(Number(from)).limit(Number(limit)),
     User.countDocuments(query)
  ])

  res.json({
    total,
    users
  })

}
/**
 * Create user
 */
const createUser = async ( req, res ) => {
  const errors = validationResult( req )

  if( !errors.isEmpty() ) {
    return res.status(400).json(errors)
  }

  const { name, email, password, role } = req.body
  
  const user = new User({ name, email, password, role })
  
  user.password = hash(password)
  
  await user.save()

  res.status(201).json({
    message: 'User created',
    user
  })
}
/*
 * Update user 
 */
const updateUser = async ( req, res ) => {
  const id = req.params.id
  const { _id, password, google, email, ...fields } = req.body

  /**
   * If password is set
   */
  if( password ) {
    fields.password = hash( password )
  }

  const user = await User.findByIdAndUpdate(id, fields)
  

  res.json({
    message: `User ${id} updated`,
    user
  })
}
/**
 * Delete user
 */
const deleteUser = async ( req, res ) => {
  const { id } = req.params

  // Hard delete from DB
  // const user = await User.findByIdAndDelete(id)

  // Soft delete (set isActive to false)
  const user = await User.findByIdAndUpdate(id, { isActive: false })

  res.json({
    message: 'User deleted',
    user
  })
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser
}
