const { z } = require("zod");

const createBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["to-read", "reading", "completed"]).optional(),
  notes: z.string().optional(),
});

const updateBookSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  author: z.string().min(1, "Author is required").optional(),
  category: z.string().min(1, "Category is required").optional(),
  status: z.enum(["to-read", "reading", "completed"]).optional(),
  notes: z.string().optional(),
});

module.exports = { createBookSchema, updateBookSchema };
