const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/Users');

// @route   GET api/auth
// @desc    Get logged in user
// @acces   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Auth user and get token
// @acces   Public
router.post('/', [
  check('email', 'Please enter your email').isEmail(),
  check('password', 'Insert valid password').exists()
], async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    };

    const payload = {
      user: {
        id: user.id
      }
    };

    // Para generar el token se necesita usar sign y pasarle el payload y el secret (<- guardarlo en otra confi)
    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
    
  } catch (err) {
    console.log(`error: ${err.msg}`)
    res.status(500).send('Server error');
  }
})

module.exports = router;