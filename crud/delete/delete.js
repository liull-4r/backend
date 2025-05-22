const { pool } = require("../../config/db.config");

const deleteData = async ({ tableName, conditions, operator = "AND" }) => {
  // Validate the operator
  if (operator !== "AND" && operator !== "OR") {
    throw new Error('Invalid operator. Only "AND" and "OR" are allowed.');
  }

  const columns = Object.keys(conditions);
  const values = Object.values(conditions);

  const whereClause = columns.map((col) => `${col} = ?`).join(` ${operator} `);

  const sqlQuery = `DELETE FROM ${tableName} WHERE ${whereClause}`;

  try {
    const [result] = await pool.query(sqlQuery, values);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = deleteData;
