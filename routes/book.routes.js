const express = require("express");
const bookController = require("../controllers/book.controller");
const router = express.Router();
router.post("/create-book", bookController.createBook);
router.put("/books/:bookId", bookController.updateBook);
router.delete("/books/:bookId", bookController.deleteBook);
router.get("/books", bookController.getFilteredBooks);
module.exports = router;
