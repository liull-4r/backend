const modelService = require("../services/model.service.js");
const serverResponder = require("../utils/ServerResponder.js");

const createModel = async (req, res) => {
  try {
    const response = await modelService.createModel();
    serverResponder(res, response);
  } catch (error) {
    serverResponder(res, {
      message: "error",
      error: "Failed to create table",
    });
  }
};

module.exports = {
  createModel,
};
