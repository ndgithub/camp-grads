const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // Get Token from header
  console.log('auth middleware called');
  const token = req.header('x-auth-token');
  if (!token) {
    console.log('no token');
    return res.status(401).json({ msg: 'no token, authorization denied' });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'token is not valid' });
  }
};
