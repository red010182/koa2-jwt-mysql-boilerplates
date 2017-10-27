const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const configFile = `${process.env.HOME || process.env.USERPROFILE}/.db_config`;
const env = process.env.NODE_ENV;
let target;
let dbName;

switch (env) {
  case 'test':
    target = env;
    dbName = 'db_test';
    break;
  case 'production':
    target = env;
    dbName = 'db';
    break;
  default:
    target = 'dev';
    dbName = 'db_dev';
    break;
}
console.log(env, dbName);
const instance = JSON.parse(fs.readFileSync(configFile))[target];
const pool = mysql.createPool({
  host: instance.ip,
  user: instance.name,
  password: instance.pw,
  port: instance.port,
  database: dbName,
  charset: 'UTF8MB4_GENERAL_CI',
  connectionLimit: 128,
  multipleStatements: true,
  queueLimit: 0
});

if (!pool) {
  throw (Error('Mysql create pool fail.'));
}

module.exports = {
  query(qString, qParams, options) {
    return new Promise((ok, fail) => {
      if (!qString || typeof (qString) !== typeof ('')) return fail(Error('invalid query string'));
      const sql = { sql: this.format(qString, qParams) };
      return pool.query(Object.assign(sql, options), (err, result) => {
        if (err) fail(err);
        else ok(result);
      });
    });
  },
  format(qString, qParams) {
    return mysql.format(qString, qParams);
  },
  reset() {
    return new Promise((ok, fail) => pool.query('DROP TABLE User;', (err, result) => {
      if (err) fail(err);
      else ok(result);
    }));
  },
  create() {
    return new Promise((ok, fail) => {
      const sql = fs.readFileSync(path.join(__dirname, './sql/init.sql'), 'utf-8');
      return pool.query(sql, (err, result) => {
        if (err) fail(err);
        else ok(result);
      });
    });
  }
};
