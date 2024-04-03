const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'Root',
  port: 30000,
  password: 'Virus@1234',
  database: 'virtual_mentor_hub'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Authentication Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes
const express = require('express');
const app = express();
const PORT = 5000;

app.get('/test', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// User registration
app.post('/register', async (req, res) => {
  const { username, password, fullName } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = 'INSERT INTO users (username, password, full_name) VALUES (?, ?, ?)';
  db.query(sql, [username, hashedPassword, fullName], (err) => {
    if (err) {
      console.error('Error registering user: ', err);
      res.status(500).json({ error: 'Error registering user' });
      return;
    }
    res.json({ message: 'User registered successfully' });
  });
});

// User login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], async (err, result) => {
    if (err) {
      console.error('Error logging in: ', err);
      res.status(500).json({ error: 'Error logging in' });
      return;
    }

    if (result.length > 0) {
      const isPasswordValid = await bcrypt.compare(password, result[0].password);
      if (isPasswordValid) {
        const token = jwt.sign({ id: result[0].id }, 'SECRET_KEY', { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(400).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(400).json({ error: 'User not found' });
    }
  });
});

// Add Mentor
app.post('/mentors', authenticate, upload.single('image'), (req, res) => {
  const { name, expertise } = req.body;
  const image = req.file.filename;

  const sql = 'INSERT INTO mentors (name, expertise, image) VALUES (?, ?, ?)';
  db.query(sql, [name, expertise, image], (err) => {
    if (err) {
      console.error('Error adding mentor: ', err);
      res.status(500).json({ error: 'Error adding mentor' });
      return;
    }
    res.json({ message: 'Mentor added successfully' });
  });
});

// Get Mentors
app.get('/mentors', (req, res) => {
  const sql = 'SELECT * FROM mentors';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching mentors: ', err);
      res.status(500).json({ error: 'Error fetching mentors' });
      return;
    }
    res.json(result);
  });
});

// Chat
app.post('/chat/:mentorId', authenticate, (req, res) => {
  const { mentorId } = req.params;
  const { message } = req.body;

  const sql = 'INSERT INTO chats (mentor_id, user_id, message) VALUES (?, ?, ?)';
  db.query(sql, [mentorId, req.userId, message], (err) => {
    if (err) {
      console.error('Error sending message: ', err);
      res.status(500).json({ error: 'Error sending message' });
      return;
    }
    res.json({ message: 'Message sent successfully' });
  });
});

// Search Mentors
app.get('/search-mentors', (req, res) => {
  const { query } = req.query;
  const sql = 'SELECT * FROM mentors WHERE name LIKE ? OR expertise LIKE ?';
  db.query(sql, [`%${query}%`, `%${query}%`], (err, result) => {
    if (err) {
      console.error('Error searching mentors: ', err);
      res.status(500).json({ error: 'Error searching mentors' });
      return;
    }
    res.json(result);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const fs = require('fs');
const path = require('path');

const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}
