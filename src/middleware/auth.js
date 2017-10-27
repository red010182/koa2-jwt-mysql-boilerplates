/* global db */
const config = require('../../config');
const getToken = require('../utils/auth');
const { verify } = require('jsonwebtoken');


module.exports = async function ensureUser(ctx, next) {
  const token = getToken(ctx);
  ctx.assert(token, 401);

  let decoded = null;
  try {
    decoded = verify(token, config.SECRET);
  } catch (err) {
    ctx.throw(401);
  }
  const [user] = await db.query('SELECT * FROM User WHERE id=?', [decoded.id]);
  ctx.assert(user, 401);
  delete user.password;

  ctx.state.user = user;

  return next();
};
