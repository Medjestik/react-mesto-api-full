const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error.js');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization && !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError());
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_TOKEN);
  } catch (err) {
    return next(new UnauthorizedError());
  }
  req.user = payload;

  return next();
};
