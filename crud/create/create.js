const { pool } = require("../../config/db.config");

const insertData = async ({ tableName, colAndVal }) => {
  if (!tableName || typeof tableName !== "string") {
    throw new Error("Invalid table name.");
  }

  const columns = Object.keys(colAndVal);
  const values = Object.values(colAndVal);

  if (columns.length === 0 || values.length === 0) {
    throw new Error("Columns and values cannot be empty.");
  }

  const columnsString = columns.join(", ");
  const placeholders = columns.map(() => "?").join(", ");
  const sqlQuery = `INSERT INTO \`${tableName}\` (${columnsString}) VALUES (${placeholders})`;

  try {
    const [result] = await pool.execute(sqlQuery, values);
    return result;
  } catch (error) {
   
    throw error;
  }
};

module.exports = insertData;
