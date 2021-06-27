const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const passValidator = require('../middleware/password_validator');

router.post('/signup', passValidator, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;