const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

const { login } = require('../controllers/auth')
const {validateFields} = require('../middlewares/validateFields')


router.post('/login', [
  body('email', 'Email is required').isEmail(),
  body('password', 'Password is required').not().isEmpty(),
  validateFields
], login)


module.exports = router
