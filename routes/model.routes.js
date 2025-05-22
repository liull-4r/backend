const express = require("express");
const modelController = require("../controllers/model.controller");
const router = express.Router();

router.get("/create-model", modelController.createModel);
module.exports = router;
