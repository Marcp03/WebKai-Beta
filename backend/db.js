const { Pool } = require('pg');
require('dotenv').config();
;
;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
;
;
pool.on('connect', () => {
  console.log('PostgreSQL connected');
});
;
;
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
