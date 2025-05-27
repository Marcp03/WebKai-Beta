const { Pool } = require('pg');
require('dotenv').config();
&nbsp;
&nbsp;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
&nbsp;
&nbsp;
pool.on('connect', () => {
  console.log('PostgreSQL connected');
});
&nbsp;
&nbsp;
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};