const { GAME_STATUS } = require("../../Enums/enums.js");
const { shuffleCards, shuffle } = require('../game-machanics/shuffling')
const { 
        FLOOD_CARDS,
        ACTION_CARDS,
        PLAYER_CARDS,
        GAME_BOARDS
      } = require('../../models/models')
const { checkForPlayerLost,
        placeTilesOnBoard,
        moveCardNewPile,
        floodOrSink,
        checkForWaterRise, floodBoard } =  require('../game-logic/board')
const { setPlayerOnTheBoard } = require('../game-logic/player')
const express = require('express');
const router = express.Router();

const handleGameEvents = ({
  socket = null,     
  io = null,          
  data = {},
  rooms = {},          
  roomName = '',      
  gameLayoutId = 0,   
  ...rest            
} = {}) => {

    //Emits a message to everyone in a room including the sender
    socket.on('gameMessage', (message, socketId) => {
      let id = rooms[roomName].chat_history.length + 1
      rooms[roomName].chat_history.push({id: id, socketId: socketId, message: message})

      io.to(roomName).emit('incomingGameMessage',  message, socket.id );
    })
  
    //receving incoming messages from the page
    socket.on('incomingPlayer', (name, id) => {
      for (let i = 0; i < rooms[roomName].players.length; i++) {
        if (rooms[roomName].players[i].socketId === id) {
          rooms[roomName].players[i].name = name;
          break; 
        }
      }

     socket.to(roomName).emit('incomingNewPlayer', name);
    })

    //increase the player ready for starting a new game
    socket.on('increaseReadyPlayers', (roomName) => {
      rooms[roomName].readyCount++;

      // if(rooms[roomName].readyCount == rooms[roomName].players.length  && rooms[roomName].players.length  > 1) { //// TODO UMCOMMENT THIS!!!!
        if(rooms[roomName].readyCount == rooms[roomName].players.length  && rooms[roomName].players.length  > 0) {
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
          current_player_turn: { number_of_actions: 0, action_cards_deal: 0, flood_cards_deal: 0 },
          gameBoard: rooms[roomName].startingGameBoard,
          current_flood_level: 1,
          flood_deal_count: 2
        }; 

        let newActionCards = JSON.parse(JSON.stringify(ACTION_CARDS)); 
        let newFloodCards = JSON.parse(JSON.stringify(FLOOD_CARDS)); 
        let newPlayerCards = JSON.parse(JSON.stringify(PLAYER_CARDS)); 


        shuffleCards(newActionCards);
        shuffleCards(newFloodCards);
        shuffleCards(newPlayerCards);
  
        let shuffleFlood = [...newFloodCards];
        let floodDealCards = JSON.parse(JSON.stringify(shuffleFlood)); 
        shuffleCards(shuffleFlood)

        rooms[roomName].gameDetails.action_deck.unused = newActionCards
        rooms[roomName].gameDetails.flood_deck.unused = newFloodCards
        shuffle(newFloodCards)

        for(var i = 0; i < rooms[roomName].gameDetails.number_of_players; i++) {
          newPlayerCards[i].socketId = rooms[roomName].players[i]
          newPlayerCards[i].playerId = i + 1,
          rooms[roomName].gameDetails.players.push(newPlayerCards[i])
        }
        
        rooms[roomName].gameDetails.players.forEach((player, ind) => {
          dealInitialActionCards(rooms[roomName].gameDetails.action_deck.unused, player, 2 )
        })
        
        placeTilesOnBoard(rooms[roomName].gameDetails.gameBoard, newFloodCards).then(result => {
          rooms[roomName].gameDetails.gameBoard = result
          rooms[roomName].gameDetails.flood_deck.unused = floodDealCards

          rooms[roomName].status = GAME_STATUS.inProgress;

          rooms[roomName].gameDetails.current_flood_level = 1
          rooms[roomName].gameDetails.current_player = rooms[roomName].gameDetails.players[0]
          io.to(roomName).emit('startGame', result); 
          io.to(roomName).emit('updateFloodLevelUI', rooms[roomName]); 
          io.to(roomName).emit('renderPlayerActionCards', rooms[roomName]); 
          io.to(roomName).emit('updateClientsPlayer', rooms[roomName])
          startGameLoop(roomName);
        })
      }
    })

    //Game Lobby - change the map type
    socket.on('changeGameLayoutType', (roomName, gameLayoutId) => {
      GAME_BOARDS.filter(board => {
        if(board.id == gameLayoutId) {
          rooms[roomName].startingGameBoard = board.layout

          io.to(roomName).emit('setGameLayout', gameLayoutId); 
        }
      })
    })

    socket.on('dealFloodCard', (roomName) => {
      let isGameover =  checkForPlayerLost(rooms[roomName])
      
      if(isGameover) {
        io.to(roomName).emit('gameOver');
      }


        let floodDeckUnusedCount = rooms[roomName].gameDetails.flood_deck.unused.length;

        //check if the user can take flood card
        //TODO

        if(floodDeckUnusedCount == 0) {
            rooms[roomName].gameDetails.flood_deck.unused = rooms[roomName].gameDetails.flood_deck.discard
            rooms[roomName].gameDetails.flood_deck.discard = []
            io.to(roomName).emit('floodDeckUnusedCount0');  
          } else {
            rooms[roomName].gameDetails.current_player_turn.flood_cards_deal++

            moveCardNewPile(rooms[roomName].gameDetails.flood_deck.discard,  rooms[roomName].gameDetails.flood_deck.unused );  
            
            io.to(roomName).emit('floodDeckDiscard', rooms[roomName]);  
            let updatedBoard = floodOrSink(rooms[roomName])
            rooms[roomName] =  updatedBoard

            io.to(roomName).emit('redrawBoard', rooms[roomName]);
            rooms[roomName].gameDetails.players.forEach((player) => {
              setPlayerOnTheBoard(rooms[roomName].gameDetails, player)
            })
            if(floodDeckUnusedCount == 0) {
              io.to(roomName).emit('floodDeckUnusedCount0');  
            }
        }
    })

    socket.on('dealActionCard', (roomName) => {




        let actionDeckUnusedCount = rooms[roomName].gameDetails.action_deck.unused.length;

        if(actionDeckUnusedCount == 0) {
            rooms[roomName].gameDetails.action_deck.unused = rooms[roomName].gameDetails.action_deck.discard
            rooms[roomName].gameDetails.action_deck.discard = []
            io.to(roomName).emit('actionDeckUnusedCount0');  
        } else {


          rooms[roomName].gameDetails.current_player_turn.action_cards_deal++
          
            moveCardNewPile(rooms[roomName].gameDetails.action_deck.discard,  rooms[roomName].gameDetails.action_deck.unused );
            io.to(roomName).emit('actionDeckDiscard', rooms[roomName]);

            let updatedWaterRise = checkForWaterRise({room: rooms[roomName], io: io})
    
            if(updatedWaterRise == 'game over'){
              io.to(roomName).emit('gameOver');  
            } else if(updatedWaterRise != false) {
              rooms[roomName] = updatedWaterRise


              //check / refactor for raiseTheWaterLevel

              // flood more tiles

              io.to(roomName).emit('redrawBoard', rooms[roomName]);
              rooms[roomName].gameDetails.players.forEach((player) => {
                setPlayerOnTheBoard(rooms[roomName].gameDetails, player)
              })

              if(actionDeckUnusedCount == 0) {
                io.to(roomName).emit('actionDeckUnusedCount0');  
              }
            }
        }

    })

    socket.on('rotatePlayers', (roomName) => {
      console.log('rotateUIPlayers', rooms[roomName])
      //rotate players
      rooms[roomName].gameDetails.players.push(rooms[roomName].gameDetails.players.shift())
      
      //set new current player
      rooms[roomName].gameDetails.current_player = rooms[roomName].gameDetails.players[0]

      //reset players turn 
      rooms[roomName].gameDetails.current_player_turn = { number_of_actions: 0, action_cards_deal: 0, flood_cards_deal: 0 }

     console.log('rotateUIPlayers', rooms[roomName])
      io.to(roomName).emit('rotateUIPlayers', rooms[roomName]); 
    })

    socket.on('disconnect', () => {
      // Get the player's room from the stored socket information
      const playerRoom = socket.roomName;

      // Filter out the disconnected player
          if (rooms[playerRoom]) {
            const playerIndex = rooms[playerRoom].players.findIndex(player => player.socketId === socket.id);
            
            if (playerIndex !== -1) {
                const player = rooms[playerRoom].players[playerIndex];
                
                rooms[playerRoom].players.splice(playerIndex, 1);
                rooms[playerRoom].gameDetails.number_of_players--;
                
                // Notify other players about the disconnection
                io.to(playerRoom).emit('player_disconnected', player.name);
                // Update the number of players in the room
                io.to(playerRoom).emit('number_of_players_in_room', rooms[playerRoom].gameDetails.number_of_players);
                
                // If the room is empty, delete it
                if (rooms[playerRoom].players.length === 0) {
                    delete rooms[playerRoom];
                }
            }
        }
    
    });

    socket.on('getRoomDetails', (roomName, callback) => {
      const roomDetails = rooms[roomName]; 
      if (callback) {
        callback(roomDetails); 
      }
    });

    socket.on('movePlayer', (player, roomName,fromId, toId) => {
      let incomingPlayerName = player;

      rooms[roomName].gameDetails.current_player_turn.number_of_actions++;

      let current_player = [];

      for (let row = 0; row < rooms[roomName].gameDetails.gameBoard.length; row++) {
            for (let col = 0; col < rooms[roomName].gameDetails.gameBoard[row].length; col++) {
                let tile = rooms[roomName].gameDetails.gameBoard[row][col];
                if (tile != 'x' && tile.id == fromId) {
                  const playerIndex = tile.current_players.findIndex(player => player.name == incomingPlayerName);
                  
                  if (playerIndex !== -1) {
                      const player = tile.current_players[playerIndex]; 
                      current_player.push(player); 
                      tile.current_players.splice(playerIndex, 1);
                  }
              }
            }
      }

      for (let row = 0; row < rooms[roomName].gameDetails.gameBoard.length; row++) {
        for (let col = 0; col < rooms[roomName].gameDetails.gameBoard[row].length; col++) {
            let tile = rooms[roomName].gameDetails.gameBoard[row][col];

            if(tile != 'x' && tile.id == toId) {
              tile.current_players.push(current_player[0])        
            }
        }
      }

      io.to(roomName).emit('moveUIPlayer', rooms[roomName]);
    });
  
    //deal action cards to a player
    const dealInitialActionCards = (from, to, dealCount) => {
    let player = to.actionCards;

    while (dealCount > 0) {
      const firstCard = from[0];
      
      if (firstCard.name !== "water rises") {
        player.push(from.shift());
        dealCount--; 
      } else {
        from.shift();
        const randomIndex = Math.floor(Math.random() * from.length);
        from.splice(randomIndex, 0, firstCard);
        dealCount++;
      }
    }
    };

    // Start the game loop (example)
    const startGameLoop = (roomName) => {
      // place players on the board.
      rooms[roomName].gameDetails.players.forEach((player) => {
        setPlayerOnTheBoard(rooms[roomName].gameDetails, player)
      })

      io.to(roomName).emit('setPlayersOnBoard', rooms[roomName]);

      let updatedRoom = floodBoard(rooms[roomName], 6)
      rooms[roomName] = updatedRoom

      io.to(roomName).emit('floodBoard', rooms[roomName]);

      io.to(roomName).emit('setFloodDeck', rooms[roomName])

      io.to(roomName).emit('setCurrentPlayer', rooms[roomName].gameDetails.current_player)

      console.log('WE HAVE DONE IT ALL')

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





module.exports = {
  handleGameEvents,
};
