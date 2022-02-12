const { Router } = require('express')
const { body, check } = require('express-validator')
const { roleExists, emailExists, userExists } = require('../helpers/db-validator')

const { getUser, createUser, updateUser, deleteUser } = require('../controllers/user')

const {
  validateFields,
  validateJWT,
  isAdmin,
  hasRole
} = require('../middlewares')

const router = Router()

/*
 * User routes
 */

/**
 * Get users
 */
router.get('/', getUser)

/*
 * Here I use the body middleware in order
 * to validate if there's an email and if it's valid
 */
router.post('/', [
  body('name', 'Invalid name').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'Password needs to be at least 6 characters long').isLength({ min: 6 }),
  body('email').custom( emailExists ),
  body('role').custom( roleExists ),
  validateFields
], createUser)

/**
 * Update user
 */
router.put('/:id', [
  check('id', 'Invalid id').isMongoId(),
  check('id').custom(userExists),
  validateFields
], updateUser)

router.delete('/:id', [
  validateJWT,
  //isAdmin,
  hasRole('ADMIN', 'MODERATOR'),
  check('id', 'Invalid id').isMongoId(),
  check('id').custom(userExists),
  validateFields
], deleteUser)

module.exports = router
