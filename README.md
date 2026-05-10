# Express + Drizzle PostgreSQL API

This project uses Express, Drizzle ORM, and PostgreSQL.

## Setup

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL` to your PostgreSQL connection string. You can use the same URI format you use for Prisma.
3. Install dependencies with `npm install`.
4. Start the server with `npm run dev` or `npm start`.

## Endpoints

- `GET /health`
- `GET /api/users`

On startup, the app ensures a `users` table exists and seeds a few users if the table is empty.