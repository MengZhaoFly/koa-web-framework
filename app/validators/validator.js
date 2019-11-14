
const { Rule, BaseValidator } = require('../../core/BaseValidator')
// const { User } = require('../models/user')

class RegisterValidator extends BaseValidator {
  validate(rules) {
    const isPass = this.isPass(rules);
    console.log('isPass', isPass)
    return isPass
  }
}

module.exports = {
  RegisterValidator
}