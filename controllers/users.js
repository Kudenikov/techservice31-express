const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorConflict = require('../errors/ErrorConflict');
const Unauthorized = require('../errors/Unauthorized');

const SALT = 10;
const { NODE_ENV, JWT_SECRET, ADMIN_EMAIL } = process.env;

module.exports.getCurrentUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        throw new ErrorConflict(`Пользователь ${req.body.email} уже зарегистрирован`);
      }
      return bcrypt.hash(req.body.password, SALT);
    })
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      isAdmin: req.body.email === ADMIN_EMAIL,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }, '+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильное имя пользователя или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неправильное имя пользователя или пароль');
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );
          res.send({ jwt: token });
        });
    })
    .catch(next);
};
