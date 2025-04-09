import pkg from 'pg';
import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import createRole from '../scripts/create.role.js';
import createAdmin from '../scripts/create.admin.js';

const { Client } = pkg;

const client = new Client({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

const initTables = async () => {
  const schemaPath = path.join(
    process.cwd(),
    'src',
    'migrations',
    'database.schema.sql'
  );

  const schema = fs.readFileSync(schemaPath, 'utf-8');

  if (!schema) {
    await client.query(schema);
  }

  return;
};

const configurateDatabase = async () => {
  client.connect((err) => {
    if (err) {
      console.log('database connection failure');
      process.exit(-1);
    } else {
      console.log('database connected successfully');
    }
  });

  initTables();
  createRole(client);
  createAdmin(client);
};

export default configurateDatabase;
