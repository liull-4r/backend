const { sqlQuery } = require("../models/db.models");
const { pool } = require("../config/db.config");
const createModel = async () => {
  try {
    const [result] = await pool.query(sqlQuery);
    return {
      message: "success",
      data: `Tables created successfully`,
    };
  } catch (error) {
    return { message: "error", error: "Failed to create table" };
  }
};
module.exports = {
  createModel,
};
