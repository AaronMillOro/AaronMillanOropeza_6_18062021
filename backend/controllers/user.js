const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const User = require('../models/User');


exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(200).json( {message: 'New user created!'}))
        .catch(error => res.status(400).json( {error} ));
    })
    .catch(error => res.status(500).json( {error} ));
};


exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      // checks presence of the user in the DB and returns user
      if (!user){
        return res.status(404).json({ error: 'User not found'});
      }
      // Checks whether a password is correct
      bcrypt.compare(req.body.password, user.password)
        .then(correct_pass => {
          if (!correct_pass){
            return res.status(401).json({ error: 'Wrong password'});
          }
          res.status(200).json({ 
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.TOKEN_KEY, 
              { expiresIn: '2h' }
            )
           });
        })
        .catch(error => res.status(401).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
};