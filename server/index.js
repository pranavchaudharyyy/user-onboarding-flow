require('dotenv').config(); // Load .env variables first
const express = require('express');
const cors = require('cors');

const app = express();

// Allow requests from React dev server
app.use(cors({ origin: 'http://localhost:5173' }));

// Parse JSON request bodies
app.use(express.json());

// Mount route files
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});