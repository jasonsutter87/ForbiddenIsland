// server/routes/gameRoutes.js
const express = require('express');
const router = express.Router();

// Example route to get game state
router.get('/state', (req, res) => {
  // Respond with game state (replace with actual logic)
  res.json({ message: 'Game state goes here' });
});

module.exports = router;
