import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

console.log(config.database_url);
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Example server listening on port ${config.port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();
