
const validateFields = require('../middlewares/validateFields')
const validateJWT = require('../middlewares/validateJWT')
const roleValidator = require('../middlewares/roleValidator')

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...roleValidator
}


