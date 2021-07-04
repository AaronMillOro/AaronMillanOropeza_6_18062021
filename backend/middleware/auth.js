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
    // token compared against the userId in the POST requests
    if( req.body.userId && (req.body.userId !== decodedToken.userId) ) {
      return res.status(403).json({error: 'Non-valid userId'});
    } else {
      console.log(req.body);
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error || 'Request not authentified' });
  }
};
