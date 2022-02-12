const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  password: { type: String, required: [true, 'Password is required'] },
  avatar: { type: String },
  role: { type: String, required: [true, 'Role is required'], enum: ['ADMIN', 'USER', 'SELLER'], default: 'USER' },
  isActive: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
})

/**
 * Don't show __v nor password when
 * returning users
 */
UserSchema.methods.toJSON = function() {
  const { __v, password, _id, ...user } = this.toObject()
  // Replace _id to uid
  user.uid = _id
  return user
}
module.exports = model( 'User', UserSchema )
