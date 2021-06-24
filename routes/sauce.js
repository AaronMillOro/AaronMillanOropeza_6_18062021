const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');
const sauceCtrl = require('../controllers/sauce');


router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);

module.exports = router; 