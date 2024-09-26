// server/routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const { GAME_BOARDS } = require("../models/models")

// Example route to get game state
router.get('/state', (req, res) => {
  // Respond with game state (replace with actual logic)
  res.json({ message: 'Game state goes here' });
});

router.get('/game-boards', (req, res) => {
  res.json(GAME_BOARDS); // Send GAME_BOARD data as JSON
});

module.exports = router;
