const { pool } = require("../../config/db.config");

const getData = async ({
  tableName,
  conditions = {},
  operator = "AND",
  orderBy = null,
  orderDirection = "ASC",
  limit = null,
  offset = null,
}) => {
  // Validate the operator
  if (operator !== "AND" && operator !== "OR") {
    throw new Error('Invalid operator. Only "AND" and "OR" are allowed.');
  }

  let whereClause = "";
  let values = [];

  // Build the WHERE clause dynamically based on the conditions object
  if (Object.keys(conditions).length > 0) {
    whereClause =
      "WHERE " +
      Object.keys(conditions)
        .map((col) => {
          const value = conditions[col];
          if (value === null) {
            return `${col} IS NULL`;
          } else if (Array.isArray(value)) {
            const placeholders = value.map(() => "?").join(", ");
            return `${col} IN (${placeholders})`;
          } else {
            return `${col} = ?`;
          }
        })
        .join(` ${operator} `);

    // Flatten the values array, excluding null values
    values = Object.values(conditions)
      .filter((value) => value !== null)
      .flat();
  }

  // Initialize the base query
  let sqlQuery = `SELECT * FROM ${tableName} ${whereClause}`;

  // Add ORDER BY clause if provided
  if (orderBy) {
    sqlQuery += ` ORDER BY ${orderBy} ${orderDirection}`;
  }

  // Add LIMIT clause if provided
  if (limit) {
    sqlQuery += ` LIMIT ${limit}`;
    if (offset) {
      sqlQuery += ` OFFSET ${offset}`;
    }
  }

  // Execute the query and return the result
  try {
    const [result] = await pool.query(sqlQuery, values);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = getData;
