const mysql = require("mysql2/promise");

const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DATABASE = process.env.DB_NAME;

if (!HOST || !USER || !DATABASE) {
  throw new Error(
    "Missing required environment variables for database connection"
  );
}

const config = {
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
  multipleStatements: true,
};

let pool;

try {
  pool = mysql.createPool(config);
} catch (error) {
  throw error;
}

module.exports = { pool };
