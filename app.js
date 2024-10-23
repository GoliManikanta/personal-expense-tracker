const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database(':memory:');

// Create Users, Transactions, and Categories tables
db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);
    
    db.run(`CREATE TABLE categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        type TEXT
    )`);

    db.run(`CREATE TABLE transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        category TEXT,
        amount REAL,
        date TEXT,
        description TEXT,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);
});

// Middleware for authentication
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, 'floww_assignment', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.userId = decoded.id;
        next();
    });
};

// User registration
app.post('/api/users/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(query, [username, hashedPassword], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, username });
    });
});

// User login
app.post('/api/users/login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = ?`;
    
    db.get(query, [username], (err, user) => {
        if (err || !user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, 'floww_assignment', { expiresIn: '1h' });
        res.status(200).json({ auth: true, token });
    });
});

// Add a new category
app.post('/api/categories', verifyToken, (req, res) => {
    const { name, type } = req.body;

    if (!name || !type) {
        return res.status(400).json({ error: 'Name and type are required' });
    }

    const query = `INSERT INTO categories (name, type) VALUES (?, ?)`;
    db.run(query, [name, type], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, name, type });
    });
});

// Get all categories
app.get('/api/categories', verifyToken, (req, res) => {
    const query = `SELECT * FROM categories`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

// Create a new transaction
app.post('/api/transactions', verifyToken, (req, res) => {
    const { type, category, amount, date, description } = req.body;

    if (!type || !category || !amount || !date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `INSERT INTO transactions (type, category, amount, date, description, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [type, category, amount, date, description, req.userId], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, type, category, amount, date, description });
    });
});

// Get all transactions
app.get('/api/transactions', verifyToken, (req, res) => {
    const query = `SELECT * FROM transactions WHERE user_id = ?`;
    db.all(query, [req.userId], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(200).json(rows || []);
    });
});

// Get transaction by ID
app.get('/api/transactions/:id', verifyToken, (req, res) => {
    const query = `SELECT * FROM transactions WHERE id = ? AND user_id = ?`;
    db.get(query, [req.params.id, req.userId], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(row);
    });
});

// Update transaction by ID
app.put('/api/transactions/:id', verifyToken, (req, res) => {
    const { type, category, amount, date, description } = req.body;

    const query = `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ? AND user_id = ?`;
    db.run(query, [type, category, amount, date, description, req.params.id, req.userId], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json({ message: 'Transaction updated successfully' });
    });
});

// Delete transaction by ID
app.delete('/api/transactions/:id', verifyToken, (req, res) => {
    const query = `DELETE FROM transactions WHERE id = ? AND user_id = ?`;
    db.run(query, [req.params.id, req.userId], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json({ message: 'Transaction deleted successfully' });
    });
});

// Retrieve summary of transactions
app.get('/api/summary', verifyToken, (req, res) => {
    const query = `SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS balance
    FROM transactions WHERE user_id = ?`;
    db.get(query, [req.userId], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(200).json(row || { total_income: 0, total_expense: 0 });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
