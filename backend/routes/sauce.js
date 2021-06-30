const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');
const sauceCtrl = require('../controllers/sauce');


router.post('/', auth, multer, sauceCtrl.create);
router.get('/', auth, sauceCtrl.all);
router.get('/:id', auth, sauceCtrl.one);
router.put('/:id', auth, multer, sauceCtrl.update);
router.delete('/:id', auth, sauceCtrl.delete);
router.post('/:id/like', auth, sauceCtrl.like);

module.exports = router; 