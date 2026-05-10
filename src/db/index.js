const postgres = require('postgres');
const { drizzle } = require('drizzle-orm/postgres-js');
const { users } = require('./schema');

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required. Use the same PostgreSQL URI you plan to use with Prisma.');
  }

  return databaseUrl;
}

let client;
let db;

function getDb() {
  if (!db) {
    client = postgres(getDatabaseUrl(), {
      max: 10,
      prepare: false,
    });

    db = drizzle(client, { schema: { users } });
  }

  return db;
}

async function initializeDatabase() {
  const database = getDb();

  await client.unsafe(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  const existingUsers = await database.select().from(users);

  if (existingUsers.length === 0) {
    await database.insert(users).values([
      { name: 'Ava Stone', email: 'ava.stone@example.com' },
      { name: 'Leo Park', email: 'leo.park@example.com' },
      { name: 'Mia Chen', email: 'mia.chen@example.com' },
    ]);
  }
}

async function closeDatabaseConnection() {
  if (client) {
    await client.end();
    client = undefined;
    db = undefined;
  }
}

module.exports = {
  getDb,
  initializeDatabase,
  closeDatabaseConnection,
};