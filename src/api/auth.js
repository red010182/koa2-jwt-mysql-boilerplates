/* global db */
const KoaRouter = require('koa-router');
const md5 = require('md5');
const router = new KoaRouter();
const config = require('../../config');
const jwt = require('jsonwebtoken');

router.post('/login', async (ctx) => {
  const { account, password } = ctx.request.body;
  ctx.assert(account && password, 400, 'Account & Password Required');

  let [user] = await db.query('SELECT * FROM User WHERE account=? AND password=?', [account, md5(password)]);
  ctx.assert(user, 401, 'Invalid account or password.');

  user = JSON.parse(JSON.stringify(user));
  delete user.password;
  const token = jwt.sign(user, config.SECRET);
  ctx.body = { user, token };
});

router.post('/logout', async (ctx) => {
  ctx.body = '';
});

module.exports = router;
