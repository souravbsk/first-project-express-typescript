import dotenv from 'dotenv';

import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  saltRound: process.env.BCRYPT_SALT_ROUND,
  defaultPassword: process.env.DEFAULT_PASS,
};
