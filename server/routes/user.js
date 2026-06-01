const router = require('express').Router();
const auth = require('../middleware/auth');
const db = require('../db');

// GET /api/user/me — fetch current user's data
// auth middleware runs first, so req.user.id is available
router.get('/me', auth, (req, res) => {
  const user = db
    .prepare(`
      SELECT id, name, email, has_paid, college, graduation_year, career_goal
      FROM users WHERE id = ?
    `)
    .get(req.user.id);

  // Note: we never send the password back to the client
  res.json(user);
});

// POST /api/user/pay — simulate payment
router.post('/pay', auth, (req, res) => {
  db.prepare('UPDATE users SET has_paid = 1 WHERE id = ?').run(req.user.id);
  res.json({ success: true });
});

// POST /api/user/onboarding — save onboarding answers
router.post('/onboarding', auth, (req, res) => {
  const { college, graduation_year, career_goal } = req.body;

  if (!college || !graduation_year || !career_goal) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.prepare(`
    UPDATE users
    SET college = ?, graduation_year = ?, career_goal = ?
    WHERE id = ?
  `).run(college, graduation_year, career_goal, req.user.id);

  res.json({ success: true });
});

module.exports = router;