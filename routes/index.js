const Routes = require("express").Router();
const model = require("./model.routes.js");
const book = require("./book.routes.js");
Routes.use(model);
Routes.use(book);
module.exports = Routes;
