const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const Sauce = require('../models/Sauce');

router.get('/', auth, (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
});

module.exports = router; 