const sqlQuery = `
  CREATE TABLE IF NOT EXISTS books (
    book_id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    status ENUM('to-read', 'reading', 'completed') DEFAULT 'to-read',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
`;
module.exports = { sqlQuery };
