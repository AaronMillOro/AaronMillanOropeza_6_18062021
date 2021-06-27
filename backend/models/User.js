const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
 
var userModel = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});
 
userModel.plugin(uniqueValidator);

module.exports = mongoose.model('User', userModel);