const router = require('koa-router')();
const user = require('./user');
const auth = require('./auth');
const ensureUser = require('../middleware/auth');

router.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    
    // hide mysql error from seen by user, you can delete it if you're not using node-mysql
    if (e.sqlMessage) { 
      e.message = null;
    }

    ctx.body = { message: e.message || 'Internal Server Error' };
    ctx.status = e.status || 500;
    console.error(e);
  }
});
router.use('/api/auth', auth.routes());

// all routes added after ensureuser would require auth
router.use(ensureUser);

router.use('/api/user', user.routes());

module.exports = router;
