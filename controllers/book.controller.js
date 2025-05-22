const bookService = require("../services/book.service.js");
const serverResponder = require("../utils/ServerResponder.js");
const {
  createBookSchema,
  updateBookSchema,
} = require("../validators/book.validator.js");

const createBook = async (req, res) => {
  try {
    // Check if request body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return serverResponder(res, {
        message: "error",
        error: "Request body is required",
      });
    }
    const validatedData = createBookSchema.parse(req.body);

    const response = await bookService.createBook(validatedData);
    serverResponder(res, response);
  } catch (error) {
    serverResponder(res, {
      message: "error",
      error: error.message || "Failed to create book",
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!req.body || Object.keys(req.body).length === 0) {
      return serverResponder(res, {
        message: "error",
        error: "Update data is required",
      });
    }

    const validatedData = updateBookSchema.parse(req.body);
    const response = await bookService.updateBook(bookId, validatedData);
    serverResponder(res, response);
  } catch (error) {
    serverResponder(res, {
      message: "error",
      error: error.message || "Failed to update book",
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const response = await bookService.deleteBook(bookId);
    serverResponder(res, response);
  } catch (error) {
    serverResponder(res, {
      message: "error",
      error: error.message || "Failed to delete book",
    });
  }
};

const getFilteredBooks = async (req, res) => {
  try {
    const { category, status } = req.query;
    const response = await bookService.getFilteredBooks({ category, status });
    serverResponder(res, response);
  } catch (error) {
    console.error("❌ Error in getFilteredBooks:", error);
    serverResponder(res, {
      message: "error",
      error: "❌ Failed to fetch books",
    });
  }
};

module.exports = {
  createBook,
  updateBook,
  deleteBook,
  getFilteredBooks,
};
