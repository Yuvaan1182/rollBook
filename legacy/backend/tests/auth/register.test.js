// tests/auth/register.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('../../src/routes/auth.route');

// Mock dependencies if needed (e.g., DB, Redis, Email Queue)

const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRouter);

describe('Auth Register API', () => {
  it('should register a new user and send verification email', async () => {
    const res = await request(app)
      .post('/api/auth/register/email-password')
      .send({
        email: 'testuser@example.com',
        password: 'TestPassword123!',
        name: 'Test User'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/verification email sent/i);
  });
});
