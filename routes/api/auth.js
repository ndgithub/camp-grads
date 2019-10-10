const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../models');
const { check, validationResult } = require('express-validator');

// @route GET api/auth
// @desc  Auth route
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await db.User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/auth
// @desc  Authenticate user and get token
// @access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    try {
      if (true) {
        throw Error('asdf');
      }
    } catch (err) {}

    // Express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await db.User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Username/Password' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Username/Password' }] });
      }

      const payload = {
        user: {
          id: user.id,
          name: user.name
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error('sup' + err.message);
      res.status(500).send('Server Error:' + err.message);
    }
  }
);

module.exports = router;
