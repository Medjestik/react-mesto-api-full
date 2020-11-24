const jwt = require('jsonwebtoken');

const { TOKEN_SECRET_KEY = 'token-secret-key' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization && !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'нет bearer' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, TOKEN_SECRET_KEY);
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'не верифицирован jwt' });
  }

  req.user = payload;

  return next();
};
