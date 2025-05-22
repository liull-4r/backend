const { v4: uuidv4 } = require("uuid");
const insertData = require("../crud/create/create");
const getData = require("../crud/read/read");
const updateData = require("../crud/update/update");
const deleteData = require("../crud/delete/delete");

const createBook = async (data) => {
  try {
    const book_id = uuidv4();
    const colAndVal = {
      book_id,
      title: data.title,
      author: data.author,
      category: data.category,
      status: data.status || "to-read",
      notes: data.notes || null,
    };

    await insertData({
      tableName: "books",
      colAndVal,
    });

    return {
      message: "success",
      data: {
        book_id,
        ...data,
      },
    };
  } catch (error) {
    
    return {
      message: "error",
      error: "❌ Error creating book: " + (error.message || "Unknown error"),
    };
  }
};

const updateBook = async (bookId, data) => {
  try {
    // Check if book exists
    const existingBook = await getData({
      tableName: "books",
      conditions: { book_id: bookId },
    });

    if (existingBook.length === 0) {
      return {
        message: "error",
        error: "📚 Book not found",
      };
    }

    await updateData({
      tableName: "books",
      updateValues: data,
      conditions: { book_id: bookId },
    });

    // Get updated book
    const updatedBook = await getData({
      tableName: "books",
      conditions: { book_id: bookId },
    });

    return {
      message: "success",
      data: updatedBook[0],
    };
  } catch (error) {
   
    return {
      message: "error",
      error: "❌ Error updating book: " + (error.message || "Unknown error"),
    };
  }
};

const deleteBook = async (bookId) => {
  try {
    // Check if book exists
    const existingBook = await getData({
      tableName: "books",
      conditions: { book_id: bookId },
    });

    if (existingBook.length === 0) {
      return {
        message: "error",
        error: "📚 Book not found",
      };
    }

    await deleteData({
      tableName: "books",
      conditions: { book_id: bookId },
    });

    return {
      message: "success",
      data: "Book deleted successfully",
    };
  } catch (error) {

    return {
      message: "error",
      error: "❌ Error deleting book: " + (error.message || "Unknown error"),
    };
  }
};

const getFilteredBooks = async ({ category, status }) => {
  try {
    const conditions = {};
    if (category) conditions.category = category;
    if (status) conditions.status = status;

   

    const books = await getData({
      tableName: "books",
      conditions,
      orderBy: "created_at",
      orderDirection: "DESC",
    });

    return {
      message: "success",
      data: books,
    };
  } catch (error) {
   
    return {
      message: "error",
      error: "❌ Error fetching books: " + (error.message || "Unknown error"),
    };
  }
};

module.exports = {
  createBook,

  updateBook,
  deleteBook,
  getFilteredBooks,
};
