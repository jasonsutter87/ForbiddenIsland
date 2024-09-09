// server/socket/gameSocket.js
module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('New player connected:', socket.id);
  
      // Example game event
      socket.on('move', (data) => {
        console.log('Move made:', data);
        // Broadcast the move to all other players
        socket.broadcast.emit('move', data);
      });
  
      socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
      });
    });
  };
  