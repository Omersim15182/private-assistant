const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'omer',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'PrivateAssistant'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
