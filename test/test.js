/* eslint-disable */
const assert = require('assert');
const supertest = require('supertest');
const app = require('../src/app.js');
const fs = require('fs');
const path = require('path');
const req = function() {
  return supertest(app.listen())
}

describe('Test Start', () => {
  before((done) => {
    (async () => {
      await db.reset();
      await db.create();
      // db add seed data
      done()
    })()
  })
  
  describe('admin', () => {
    it('should not login with wrong password', (done) => {
      req()
        .post('/api/auth/login')
        .type('json')
        .send('{"account": "admin", "password":"12344"}')
        .expect(401, done)
    })
    it('should login with right password', (done) => {
      req()
        .post('/api/auth/login')
        .type('json')
        .send('{"account": "admin", "password":"1234"}')
        .expect(200)
    })
  })
})