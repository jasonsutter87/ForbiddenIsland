// Import the game setup function


module.exports = (io) => {
  // Track rooms and player counts
  const rooms = {};
  const { game_runner, initialize, game_setup } =  require('../controllers/game-logic/game')
  const { setDifficulty } =  require('../controllers/game-logic/board')
  const { game_board, game_details, FLOOD_CARDS, ACTION_CARDS, PLAYER_CARDS  } = require('../models/models')


  io.on('connection', (socket) => {
    //check the status of incoming players
    // console.log('New player connected:', socket.id);
    initialize(socket);
  
    // Assign player to a room with space or create a new room
    let roomName = findRoomWithSpace(rooms);
  
    // Store room information in the socket for easy reference during disconnect
    socket.roomName = roomName;
    socket.join(roomName);
    io.to(roomName).emit('settingRoomName', roomName);

    //check the status of incoming players
    console.log(`Player ${socket.id} joined room: ${roomName}`);
  
    // Add player to room's player count
    if (!rooms[roomName]) {
      rooms[roomName] = [];
    }
    rooms[roomName].players.push(socket.id);
    rooms[roomName].gameDetails.number_of_players = rooms[roomName].players.length

  
    //console log for data tracking... todo remove later
    console.log('Room', rooms);
    console.log(`Room ${roomName} now has ${rooms[roomName].players.length} players.`);


  
    // Check if the room is full (4 players)
    if (rooms[roomName].players.length === 4) {
      //the game room is now full
      console.log(`Room ${roomName} is full. Starting game.`);

      io.to(roomName).emit('startGame');
      startGameLoop(roomName);
    } else {

      //the romm is not full yet
      console.log(`Room ${roomName} is not full yet.`);
    }

    // Handle player move
    socket.on('resetGame', (data) => {
      console.log('Move made:', data);
      socket.to(roomName).emit('move', data);
    });

    //Emits a message to everyone in a room including the sender
    socket.on('gameMessage', (data) => {
      io.to(roomName).emit('incomingGameMessage',  data, socket.id );
    })
  
    //receving incoming messages from the page
    socket.on('incomingPlayer', (data) => {
     socket.to(roomName).emit('incomingNewPlayer', data);
    })

    //increase the player ready for starting a new game
    socket.on('increaseReadyPlayers', (roomName) => {
      console.log('increaseReadyPlayers', roomName)
      rooms[roomName].readyCount++;

      if(rooms[roomName].readyCount == rooms[roomName].players.length  && rooms[roomName].players.length  > 1) {
        io.to(roomName).emit('startGame'); 


      

        game_setup(game_board, FLOOD_CARDS, ACTION_CARDS, PLAYER_CARDS, 1)
        startGameLoop(roomName);
      }
    })

    socket.on('disconnect', () => {
      // console.log('Player disconnected:', socket.id);

      // Get the player's room from the stored socket information
      const playerRoom = socket.roomName;
  
      // Filter out the disconnected player
      if (rooms[playerRoom]) {
        rooms[playerRoom].players = rooms[playerRoom].players.filter(playerId => playerId !== socket.id);
    
        // If the room is empty, delete it
        if (rooms[playerRoom].players.length === 0) {
          delete rooms[playerRoom];
          // console.log(`Room ${playerRoom} deleted.`);
        } else {
          // console.log(`Room ${playerRoom} now has ${rooms[playerRoom].length} players.`);
        }
      }
    });

  });


  // Find a room with less than 4 players or create a new one
  const findRoomWithSpace = (rooms) => {
    for (const room in rooms) {
      if (rooms[room].players.length < 4) {
        return room;
      }
    }
    // If no room has space, create a new one
    const newRoomName = `room-${Object.keys(rooms).length + 1}`;
    rooms[newRoomName] = {
      name: newRoomName,
      players: [],
      readyCount: 0,
      gameDetails: game_details
    };
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
