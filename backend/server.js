const express = require('express');
const cors = require('cors');
const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));

// Database Setup
const dbPath = path.resolve(__dirname, 'portfolio.db');
const db = new DatabaseSync(dbPath);
console.log('Connected to the SQLite database.');

// Create schema
db.exec(`CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

db.exec(`CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT, -- Base64 encoded image string
  event_date TEXT, -- Date of event
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// API Routes
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const stmt = db.prepare('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)');
    const info = stmt.run(name, email, message);
    
    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully',
      id: info.lastInsertRowid
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: 'Failed to save contact message' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Blog Posts API Routes
app.get('/api/posts', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM posts ORDER BY event_date DESC, created_at DESC');
    const rows = stmt.all();
    res.json(rows);
  } catch (err) {
    console.error('Error fetching posts:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve blog posts' });
  }
});

app.post('/api/posts', (req, res) => {
  const { title, content, image, event_date, passcode } = req.body;

  if (passcode !== 'saurav123') {
    return res.status(401).json({ error: 'Unauthorized: Invalid passcode' });
  }

  if (!title || !content || !event_date) {
    return res.status(400).json({ error: 'Title, content, and event date are required' });
  }

  try {
    const stmt = db.prepare('INSERT INTO posts (title, content, image, event_date) VALUES (?, ?, ?, ?)');
    const info = stmt.run(title, content, image || null, event_date);
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      id: info.lastInsertRowid
    });
  } catch (err) {
    console.error('Error creating post:', err.message);
    return res.status(500).json({ error: 'Failed to save blog post' });
  }
});

app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const passcode = req.headers['x-passcode'] || req.body.passcode;

  if (passcode !== 'saurav123') {
    return res.status(401).json({ error: 'Unauthorized: Invalid passcode' });
  }

  try {
    const stmt = db.prepare('DELETE FROM posts WHERE id = ?');
    const info = stmt.run(id);
    if (info.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting post:', err.message);
    return res.status(500).json({ error: 'Failed to delete blog post' });
  }
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
