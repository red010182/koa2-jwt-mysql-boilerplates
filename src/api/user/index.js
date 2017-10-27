/* global db */
const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  [user] = await db.query('SELECT id, name FROM User WHERE id=?', [id]);
  ctx.body = user;
});


module.exports = router;
