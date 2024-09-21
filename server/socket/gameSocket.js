// Import the game setup function


module.exports = (io) => {
  // Track rooms and player counts
  const rooms = {};
  const { game_runner, initialize } =  require('../controllers/game-logic/game')
  const {game_board, game_details } = require('../models/models')

  io.on('connection', (socket) => {
    console.log('New player connected:', socket.id);
    initialize(socket);
  
    // Assign player to a room with space or create a new room
    let roomName = findRoomWithSpace(rooms);
  
    // Store room information in the socket for easy reference during disconnect
    socket.roomName = roomName;
  
    socket.join(roomName);
    console.log(`Player ${socket.id} joined room: ${roomName}`);
  
    // Add player to room's player count
    if (!rooms[roomName]) {
      rooms[roomName] = [];
    }
    rooms[roomName].push(socket.id);
    
    console.log('Room', rooms);
    console.log(`Room ${roomName} now has ${rooms[roomName].length} players.`);
  
    // Check if the room is full (4 players)
    if (rooms[roomName].length === 4) {
      console.log(`Room ${roomName} is full. Starting game.`);
      // io.to(roomName).emit('startGame'); // Notify players to start game loop
      // startGameLoop(roomName);
    } else {
      console.log(`Room ${roomName} is not full yet.`);
    }

  
    // Handle player move
    socket.on('resetGame', (data) => {
      console.log('Move made:', data);
      socket.to(roomName).emit('move', data);
    });

    socket.on('gameMessage', (data) => {
      console.log('Received message:', {data: data, id: socket.id}); // Debugging step to check if message is received
      socket.to(roomName).emit('incomingGameMessage', data, socket.id);
  })
  

  socket.on('incomingPlayer', (data) => {
    console.log('Received incomingPlayer:', {data: data})
    socket.to(roomName).emit('incomingNewPlayer', data);
  })


 


  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);

    // Get the player's room from the stored socket information
    const playerRoom = socket.roomName;

    // Filter out the disconnected player
    if (rooms[playerRoom]) {
      rooms[playerRoom] = rooms[playerRoom].filter(playerId => playerId !== socket.id);
  
      // If the room is empty, delete it
      if (rooms[playerRoom].length === 0) {
        delete rooms[playerRoom];
        console.log(`Room ${playerRoom} deleted.`);
      } else {
        console.log(`Room ${playerRoom} now has ${rooms[playerRoom].length} players.`);
      }
    }
  });

  });

  // Find a room with less than 4 players or create a new one
  const findRoomWithSpace = (rooms) => {
    for (const room in rooms) {
      if (rooms[room].length < 4) {
        return room;
      }
    }
    // If no room has space, create a new one
    const newRoomName = `room-${Object.keys(rooms).length + 1}`;
    console.log(`Creating new room: ${newRoomName}`);
    return newRoomName;
  };

  // Start the game loop (example)
  const startGameLoop = (roomName) => {
    console.log(`Starting game loop for room: ${roomName}`);
    
    game_runner()
    
    // Notify players that the game has started
    io.to(roomName).emit('gameUpdate', { message: 'Game started!' });
  
    // Example game loop logic
    let gameRunning = true;
    let intervalId = setInterval(() => {
      if (!gameRunning) {
        clearInterval(intervalId);
      }
      io.to(roomName).emit('gameUpdate', { message: 'Game update...' });
    }, 1000); // Send updates every second
  };

};
