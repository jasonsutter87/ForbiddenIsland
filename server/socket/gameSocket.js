const rooms = {};

module.exports = (io) => {
  // Track rooms and player counts
  const { initialize } =  require('../controllers/game-logic/game')
  const { handleGameEvents } = require('../controllers/game-logic/events.js')
  const { game_details,  GAME_BOARDS  } = require('../models/models')
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
    rooms[roomName].players.push({socketId: socket.id, name: '' });
    rooms[roomName].gameDetails.number_of_players = rooms[roomName].players.length
    io.to(roomName).emit('number_of_players_in_room', rooms[roomName].gameDetails.number_of_players);


    handleGameEvents({'socket': socket, 'io': io, 'rooms': rooms,'roomName': roomName})
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
      chat_history: [],
      gameDetails: game_details,
      startingGameBoard: GAME_BOARDS[0].layout,
      status: GAME_STATUS.notStarted
    };
    return newRoomName;
  };
};


module.exports.rooms = rooms;