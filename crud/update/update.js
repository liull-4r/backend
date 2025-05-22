const { pool } = require("../../config/db.config");

const updateData = async ({
  tableName,
  updateValues,
  conditions,
  operator = "AND",
}) => {
  // Basic validations
  if (!tableName || !updateValues || !conditions) {
    throw new Error("Missing table name, update values, or conditions.");
  }
  if (Object.keys(updateValues).length === 0) {
    throw new Error("Update values cannot be empty.");
  }
  if (Object.keys(conditions).length === 0) {
    throw new Error("Conditions cannot be empty.");
  }

  // Validate operator
  if (operator !== "AND" && operator !== "OR") {
    throw new Error('Invalid operator. Only "AND" or "OR" allowed.');
  }

  // SET clause
  const setClause = Object.keys(updateValues)
    .map((col) => `${col} = ?`)
    .join(", ");
  const setValues = Object.values(updateValues);

  // WHERE clause
  const conditionClauses = [];
  const conditionValues = [];

  for (const [col, value] of Object.entries(conditions)) {
    if (Array.isArray(value)) {
      conditionClauses.push(`${col} IN (${value.map(() => "?").join(", ")})`);
      conditionValues.push(...value);
    } else {
      conditionClauses.push(`${col} = ?`);
      conditionValues.push(value);
    }
  }

  const whereClause = conditionClauses.join(` ${operator} `);
  const sqlQuery = `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`;

  try {
    const [result] = await pool.query(sqlQuery, [
      ...setValues,
      ...conditionValues,
    ]);
    return result;
  } catch (error) {
   
    throw error;
  }
};

module.exports = updateData;
