const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // Get Token from header
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'no token, authorization denied' });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.satus(401).json({ msg: "token is not valid" })
  }

}