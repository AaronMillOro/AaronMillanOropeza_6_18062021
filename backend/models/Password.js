const passwordValidator = require('password-validator');

const passwordModel = new passwordValidator();
// properties to be fullfilled
passwordModel
  .is().min(8)                                    // Minimum length 8
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits(1)                                // Must have at least 1 digit
  .has().symbols(1)                               // Must have at least 1 special character
  .is().not().oneOf(['password', '123pasword', 'password123']); // Blacklist these values

module.exports = passwordModel;