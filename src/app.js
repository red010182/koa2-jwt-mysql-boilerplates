global.moment = require('moment');
global.db = require('./db');

global.log = console.log;
global.now = () => (+new Date());

const Koa = require('koa');
const Cors = require('koa2-cors');
const Logger = require('koa-logger');
const BodyParser = require('koa-bodyparser');

const router = require('./api/route');

const app = new Koa();
app.use(Cors());
app.use(new Logger());
app.use(new BodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
