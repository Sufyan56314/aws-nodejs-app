require('dotenv').config();

const { app } = require('./app');
const { initializeDatabase, closeDatabaseConnection } = require('./db');

const port = Number(process.env.PORT) || 3000;

async function startServer() {
  await initializeDatabase();

  const server = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });

  const shutdown = async () => {
    server.close(async () => {
      await closeDatabaseConnection();
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

startServer().catch(async (error) => {
  console.error('Failed to start server:', error);
  await closeDatabaseConnection();
  process.exit(1);
});