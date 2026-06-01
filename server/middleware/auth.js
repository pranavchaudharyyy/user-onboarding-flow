const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  // Token comes in header: "Authorization: Bearer <token>"
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Extract just the token part

  try {
    // jwt.verify checks signature AND expiry
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: 5, iat: ..., exp: ... }
    next(); // Pass control to the actual route handler
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};