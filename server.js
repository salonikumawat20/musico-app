const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');
const mysql = require('mysql2'); // ✅ Added MySQL

const app = express();
const PORT = 3000;

// ✅ MySQL Connection Setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // 🔁 Replace with your MySQL username
  password: 'saloni123',  // 🔁 Replace with your MySQL password
  database: 'musicApp'  // 🔁 Replace with your DB name
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL');
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // serve frontend files

// ✅ Signup Route with DB insert
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('❌ Signup error:', err);
        return res.status(500).json({ message: 'Signup failed' });
      }

      console.log('✅ User saved to DB:', result);
      res.status(200).json({ message: 'Signup successful' });
    });
  } catch (error) {
    console.error('❌ Server error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Run server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
