const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');
const sauceCtrl = require('../controllers/sauce');
// to remove
const Sauce = require('../models/Sauce');


router.get('/', auth, (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
});

router.post('/', auth, multer, sauceCtrl.createSauce);

module.exports = router; 