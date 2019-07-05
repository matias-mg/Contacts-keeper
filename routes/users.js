const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/Users');

// @route   POST api/users
// @desc    Register a user
// @acces   Public
router.post(
  '/',
  [
    check('name', 'Please add a valid name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 length or more').isLength({ min: 6 })
  ],
  async (req, res) => {
    // Guardar los resultados de checks en una variable
    const errors = validationResult(req);

    // Si los resultados tienen algún valor, se cambia el estado a 400 (Bad request) y se envía JSON con error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Si es correcto, se aplica Destructuring al request body (Donde se almacenan los JSON)
    const { name, email, password } = req.body;

    try {
      // Se intenta verificar que exista algún usuario con el mismo correo
      let user = await User.findOne({ email });

      // Si la función de arriba encuentra algun usuario, se arroja JSON de error y status 400
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Si todo es correcto, se crea nuevo usuario con los objetos del request body
      user = new User({
        name,
        email,
        password
      });

      // Password encrypt con 10 carácteres (por default), retorna una promyse, so, se usa AWAIT
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // Si todo es correcto, el usuario se guarda en nuestra BBDD
      await user.save();

      // Crear la carga para enviar a JWT
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
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
