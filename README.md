# 🛠 ShelfLog — Backend

This is the **backend API** for ShelfLog, a personal book logging app that enables users to log and manage books they want to read, are currently reading, or have completed. The backend is built with a clean and minimal **Node.js + Express** stack using **MySQL** and **Zod** for validation.

---

## 🔐 Tech Stack

- 🟢 **Node.js + Express** – Fast and scalable server framework
- 🗃 **MySQL** – Relational database (with raw SQL queries)
- 📦 **Zod** – Lightweight validation library
- ⚙️ **dotenv** – Environment variable management
- 🔄 **CORS Enabled** – Smooth connection to frontend
- ⚡ RESTful API – Follows best practices for route structure

## 📦 Features

- ✅ Add a book (title, author, category, status, notes)
- ✏️ Update book details
- ❌ Delete a book with confirmation
- 🔍 Filter books by `category` and `status`
- 📋 JSON-based API ready for frontend
- 🔐 Validates all input using Zod
- 🔄 Auto-refresh integration-ready with frontend (React Query)

## 📁 Folder Structure

backend/
├── config/ # DB config and .env handling
├── routes/ # Express route files (books, models. etc)
├── controllers/ # Logic for handling routes
├── services/ # Raw SQL queries and DB logic
├── models/ # SQL schema setup
├── validators/ # Zod validation schemas
├── utils/ #  server responses, helpers
└── server.js # Main Express server entry

---

## ⚙️ Setup Instructions

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/liull-4r/backend.git
cd backend
npm install
2. Configure Environment
Create a .env file in the backend/ directory with the following:
PORT=3000
DB_HOST=localhost
DB_USER=your db user 
DB_PASSWORD=your_mysql_password
DB_NAME=your db name
Ensure MySQL is running and the database is created manually or by script.

CREATE DATABASE;

3. Run the Server

node server.js
The API will run at:
📍 http://localhost:3000/api/v1

🔐 API Endpoints Overview
Method	Endpoint	Description
POST	/create-model    to create tables
POST	/create-book     Add a new book
GET	/books	         List all books (with filters)
PUT	/books/:id	Update book details
DELETE	/books/:id	Delete a book by ID

🧠 Implementation Approach
The backend is intentionally minimal and readable, with a clear separation of responsibilities:

Routes handle HTTP requests

Controllers process input and call services

Services contain raw SQL to interact with MySQL

Zod validates inputs before writing to the DB

CORS is enabled for frontend integration
```
