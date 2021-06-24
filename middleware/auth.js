const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;
    // checks whether userID is in the request and if it corresponds to the decoded userId
    if (req.body.userId && req.userId.body.userId !== userId) {
      throw 'Non-valid userId';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | 'Request not authentified' });
  }
};