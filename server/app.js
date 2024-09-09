// server/app.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const gameRoutes = require('./routes/gameRoutes');
const gameSocket = require('./socket/gameSocket');

// Initialize Express
const app = express();

// Middleware (e.g., for parsing JSON)
app.use(express.json());

// Use game routes for REST API
app.use('/api/game', gameRoutes);

// Create HTTP server and initialize Socket.io
const server = http.createServer(app);
const io = socketIo(server);

// Set up the socket.io events
gameSocket(io);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
