const express = require('express');
const cors = require('cors');
const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const nodemailer = require('nodemailer');

// Load environment variables if local file exists
try {
  process.loadEnvFile(path.resolve(__dirname, '.env'));
} catch (e) {
  // .env file not found, which is normal in production (e.g. Render environment variables)
}

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

// Email Transporter Setup
let transporter = null;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

if (smtpUser && smtpPass) {
  const cleanPass = smtpPass.trim().replace(/\s+/g, '');
  const smtpPort = parseInt(process.env.SMTP_PORT || '465');

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser.trim(),
      pass: cleanPass
    },
    tls: {
      rejectUnauthorized: false // Bypasses self-signed certificate issues in cloud environments like Render
    }
  });
  console.log('Email forwarding transporter configured successfully.');
} else {
  console.log('SMTP credentials not fully configured. Email forwarding is disabled.');
}

async function sendForwardingEmail(name, email, message) {
  if (!transporter) {
    console.log('Skipping email forward (transporter not configured)');
    return;
  }

  const receiver = process.env.CONTACT_RECEIVER || smtpUser;
  const mailOptions = {
    from: `"${name} (Portfolio)" <${smtpUser}>`,
    to: receiver,
    replyTo: email,
    subject: `New Portfolio Message from ${name}`,
    text: `You have received a new message from your portfolio contact form:

Name: ${name}
Email: ${email}
Message: ${message}

---
To reply directly to them, just reply to this email.`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #4f46e5; border-bottom: 2px solid #eef2f6; padding-bottom: 10px; margin-top: 0;">New Portfolio Message</h2>
        <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #4f46e5; border-radius: 4px; margin: 20px 0;">
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #64748b; text-align: center;">This message was automatically forwarded from your portfolio contact form.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
  console.log(`Email successfully forwarded to ${receiver}`);
}

// API Routes
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const stmt = db.prepare('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)');
    const info = stmt.run(name, email, message);
    
    // Trigger email forwarding asynchronously in the background
    sendForwardingEmail(name, email, message).catch(err => {
      console.error('Email forwarding failed:', err.message);
    });

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

// Secure Admin Route to retrieve submitted contact messages
app.get('/api/contacts', (req, res) => {
  const passcode = req.headers['x-passcode'] || req.query.passcode;

  if (passcode !== 'saurav123') {
    return res.status(401).json({ error: 'Unauthorized: Invalid passcode' });
  }

  try {
    const stmt = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC');
    const rows = stmt.all();
    res.json(rows);
  } catch (err) {
    console.error('Error fetching contacts:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve contact messages' });
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
