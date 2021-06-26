const passwordRules = require('../models/Password');

module.exports = (req, res, next) => {
  try {
    if (!passwordRules.validate(req.body.password)){
      return res.status(400).json({ error: 'Password should contain: 8-50 characters, upper and lower case and 1 digit' });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error });
  } 
};