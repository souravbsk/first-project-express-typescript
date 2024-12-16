import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example server listening on port ${config.port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.error('👹  Unhandled promise rejection:');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.error('👹  uncaughtException promise rejection:');
  process.exit(1);
});
