const multer = require('multer');

// allowed format of images
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// parameters to store images in local folder named 'img' 
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'img')
  },
  filename: (req, file, callback) => {
    // name sanitizer 
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage }).single('image');