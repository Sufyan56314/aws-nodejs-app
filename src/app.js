const express = require('express');
const { asc } = require('drizzle-orm');
const { getDb } = require('./db');
const { users  = require('./db/schema');

const app = express();

app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' , deployment : 'CI/CD test successful' });
});

app.get('/api/users', async (_request, response, next) => {
  try {
    const db = getDb();
    const userList = await db.select().from(users).orderBy(asc(users.id));

    response.json({
      data: userList,
      count: userList.length,
    });
  } catch (error) {
    next(error);
  }
});

app.use((error, _request, response, _next) => {
  console.error(error);

  response.status(500).json({
    error: error.message || 'Internal server error',
  });
});

module.exports = {
  app,
};