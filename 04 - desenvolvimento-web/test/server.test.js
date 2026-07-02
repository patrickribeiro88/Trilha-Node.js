const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/server');

test('GET / returns Hello, World!', async () => {
  const response = await request(app).get('/');

  assert.equal(response.status, 200);
  assert.equal(response.text, 'Hello, World!');
});
