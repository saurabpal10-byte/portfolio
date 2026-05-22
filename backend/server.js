const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));

// Database Setup
// Using SQLite for simplicity in deployment, could easily be swapped for MySQL
const dbPath = path.resolve(__dirname, 'portfolio.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create schema
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      image TEXT, -- Base64 encoded image string
      event_date TEXT, -- Date of event
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// API Routes
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;
  
  db.run(sql, [name, email, message], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to save contact message' });
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully',
      id: this.lastID 
    });
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Blog Posts API Routes
app.get('/api/posts', (req, res) => {
  const sql = `SELECT * FROM posts ORDER BY event_date DESC, created_at DESC`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching posts:', err.message);
      return res.status(500).json({ error: 'Failed to retrieve blog posts' });
    }
    res.json(rows);
  });
});

app.post('/api/posts', (req, res) => {
  const { title, content, image, event_date, passcode } = req.body;

  if (passcode !== 'saurav123') {
    return res.status(401).json({ error: 'Unauthorized: Invalid passcode' });
  }

  if (!title || !content || !event_date) {
    return res.status(400).json({ error: 'Title, content, and event date are required' });
  }

  const sql = `INSERT INTO posts (title, content, image, event_date) VALUES (?, ?, ?, ?)`;
  db.run(sql, [title, content, image || null, event_date], function(err) {
    if (err) {
      console.error('Error creating post:', err.message);
      return res.status(500).json({ error: 'Failed to save blog post' });
    }
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      id: this.lastID
    });
  });
});

app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const passcode = req.headers['x-passcode'] || req.body.passcode;

  if (passcode !== 'saurav123') {
    return res.status(401).json({ error: 'Unauthorized: Invalid passcode' });
  }

  const sql = `DELETE FROM posts WHERE id = ?`;
  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Error deleting post:', err.message);
      return res.status(500).json({ error: 'Failed to delete blog post' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  });
});

// Serve static assets from the Vite production build
app.use(express.static(path.join(__dirname, '../dist')));

// Fallback catch-all route for Single Page Application (SPA) routing
app.get('/*any', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
