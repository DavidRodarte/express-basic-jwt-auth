const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

const { login, googleSignIn } = require('../controllers/auth')
const {validateFields} = require('../middlewares/validateFields')

/**
 * Login
 */
router.post('/login', [
  body('email', 'Email is required').isEmail(),
  body('password', 'Password is required').not().isEmpty(),
  validateFields
], login)

/*
 * Login with Google
 */
router.post('/google', [
  body('g_token', 'g_token is required').not().isEmpty(),
  validateFields
], googleSignIn)


module.exports = router
