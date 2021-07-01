const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // presence of token
    if(!token) {
      return res.status(403).json({error: 'Access denied'});
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    // check if token was correctly constructed
    if(!decodedToken.userId) {
      return res.status(403).json({error: 'Non-valid userId'});
    } else {
      req.body.userId = decodedToken.userId;
      //console.log(req.body);
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error || 'Request not authentified' });
  }
};
