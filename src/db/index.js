const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const configFile = `${process.env.HOME || process.env.USERPROFILE}/.db_config`;
const env = process.env.NODE_ENV;

const DB_TEST = 'db_test';
const DB_PRODUCTION = 'db';
const DB_DEV = 'db_dev';


let target;
let dbName;

switch (env) {
  case 'test':
    target = env;
    dbName = DB_TEST;
    break;
  case 'production':
    target = env;
    dbName = DB_PRODUCTION;
    break;
  default:
    target = 'dev';
    dbName = DB_DEV;
    break;
}
console.log(env, dbName);
const instance = JSON.parse(fs.readFileSync(configFile))[target];
const pool = mysql.createPool({
  host: instance.host,
  user: instance.account,
  password: instance.password,
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
