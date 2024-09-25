// Import the game setup function

const { shuffle } = require('../controllers/game-machanics/shuffling');


module.exports = (io) => {
  // Track rooms and player counts
  const rooms = {};
  const { initialize } =  require('../controllers/game-logic/game')
  const { setDifficulty, placeTilesOnBoard } =  require('../controllers/game-logic/board')
  const { shuffleCards, shuffle } = require('../controllers/game-machanics/shuffling')
  const { game_board, game_details, FLOOD_CARDS, ACTION_CARDS, PLAYER_CARDS  } = require('../models/models')
  const { GAME_STATUS } = require("../Enums/enums.js");




  io.on('connection', (socket) => {
    //check the status of incoming players
    initialize(socket);
  
    // Assign player to a room with space or create a new room
    let roomName = findRoomWithSpace(rooms);
  
    // Store room information in the socket for easy reference during disconnect
    socket.roomName = roomName;
    socket.join(roomName);
    io.to(roomName).emit('settingRoomName', roomName);


    // Add player to room's player count
    if (!rooms[roomName]) {
      rooms[roomName] = [];
    }
    rooms[roomName].players.push(socket.id);
    rooms[roomName].gameDetails.number_of_players = rooms[roomName].players.length
    io.to(roomName).emit('number_of_players_in_room', rooms[roomName].gameDetails.number_of_players);


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
      rooms[roomName].readyCount++;

      if(rooms[roomName].readyCount == rooms[roomName].players.length  && rooms[roomName].players.length  > 1) {
        rooms[roomName].gameDetails =  {
          flood_deck: {
              discard: [],
              unused: [],
              removed: []
          },
          action_deck: {
              discard: [],
              unused: []
          },
          players: [],
          number_of_players: rooms[roomName].players.length,
          current_player: null,
          current_player_turns_left: null,
          gameBoard: game_board,
          status: GAME_STATUS.notStarted,
          current_flood_level: 0
        }; 
  
        let newActionCards = [...ACTION_CARDS];
        let newFloodCards = [...FLOOD_CARDS];
        let newPlayerCards = [...PLAYER_CARDS];

        shuffleCards(newActionCards);
        shuffleCards(newFloodCards);
        shuffleCards(newPlayerCards);
  
        let shuffleFlood = [...newFloodCards];
        shuffleCards(shuffleFlood)

        rooms[roomName].gameDetails.action_deck.unused = newActionCards
        rooms[roomName].gameDetails.flood_deck.unused = newFloodCards

        for(var i = 0; i < rooms[roomName].gameDetails.number_of_players; i++) {
          rooms[roomName].gameDetails.players.push(newPlayerCards[i])
        }
    
        shuffle(newFloodCards)
        
        
        placeTilesOnBoard(rooms[roomName].gameDetails.gameBoard, newFloodCards).then(result => {
          rooms[roomName].status = GAME_STATUS.inProgress;
          io.to(roomName).emit('startGame', result); 
          startGameLoop(roomName);
        })
      }
    })

    socket.on('disconnect', () => {
      // console.log(('Player disconnected:', socket.id);
      
      // Get the player's room from the stored socket information
      const playerRoom = socket.roomName;
      
      // Filter out the disconnected player
      if (rooms[playerRoom]) {
        rooms[playerRoom].players = rooms[playerRoom].players.filter(playerId => playerId !== socket.id);
        rooms[playerRoom].gameDetails.number_of_players--
        io.to(playerRoom).emit('number_of_players_in_room', rooms[playerRoom].gameDetails.number_of_players);
    
        // If the room is empty, delete it
        if (rooms[playerRoom].players.length === 0) {
          delete rooms[playerRoom];
          // // console.log((`Room ${playerRoom} deleted.`);
        } else {
          // // console.log((`Room ${playerRoom} now has ${rooms[playerRoom].length} players.`);
        }
      }
    });

  });


  // Find a room with less than 4 players or create a new one
  const findRoomWithSpace = (rooms) => {
    for (const room in rooms) {
      if (rooms[room].players.length < 4 && rooms[room].status === GAME_STATUS.notStarted) {
        return room;
      }
    }
    // If no room has space, create a new one
    const newRoomName = `room-${Object.keys(rooms).length + 1}`;
    rooms[newRoomName] = {
      name: newRoomName,
      players: [],
      readyCount: 0,
      gameDetails: game_details,
      status: GAME_STATUS.notStarted
    };
    // console.log((`Creating new room: ${newRoomName}`);
    return newRoomName;
  };

  // Start the game loop (example)
  const startGameLoop = (roomName) => {
    console.log(`Starting game loop for room: ${roomName}`);
    

    // // Notify players that the game has started
    // io.to(roomName).emit('gameUpdate', { message: 'Game started!' });

    // // Example game loop logic
    // let gameRunning = true;
    // let intervalId = setInterval(() => {
    //   if (!gameRunning) {
    //     clearInterval(intervalId);
    //   }
    //   io.to(roomName).emit('gameUpdate', { message: 'Game update...' });
    // }, 1000); // Send updates every second
  };

};
