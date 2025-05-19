import dotenv from 'dotenv';
import app from './app.js';
import pool from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 3011;

let server;

// Attempt DB connection before starting server
pool.connect()
  .then(client => {
    client.release(); // release immediately after test
    console.log('Connected to PostgreSQL');

    server = app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to PostgreSQL:', err);
    process.exit(1);
  });

// Handle unexpected shutdowns
const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log(' Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

process.on('uncaughtException', exitHandler);
process.on('unhandledRejection', exitHandler);
process.on('SIGTERM', () => {
  console.log(' SIGTERM received. Shutting down...');
  if (server) server.close();
});
