const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

// ── SIGNUP ──────────────────────────────────────────
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check duplicate email
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  // Hash the password — bcrypt adds a "salt" automatically
  // 10 = cost factor (higher = slower = more secure)
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user to DB
  const result = db
    .prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
    .run(name, email, hashedPassword);

  // Create JWT with just the user ID inside
  const token = jwt.sign(
    { id: result.lastInsertRowid },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ token });
});

// ── LOGIN ────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Find user by email
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  // IMPORTANT: same error message for wrong email OR wrong password
  // Don't tell attackers which one was wrong
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // bcrypt.compare hashes the input and compares to stored hash
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ token });
});

module.exports = router;