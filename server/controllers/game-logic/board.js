// Handles the setup of the game board, including placing tiles, managing the board state, and updating the board as the game progresses.
const { TREASURES, GAME_STATUS } = require("../../Enums/enums.js");
let { game_details } = require("../../models/models.js");
const { dividedShuffle  } = require('../../controllers/game-machanics/shuffling')


let raiseTheWaterLevel = (room) => { 
      switch (true) {
        case (room.current_flood_level >= 8):
          return 5;
        case (room.current_flood_level >= 6):
         return 4;
        case (room.current_flood_level >= 3):
          return 3;
        default:
          return 2; 
      }
} 
  
let placeTilesOnBoard = (gameBoard, cards) => {
  return new Promise(( resolve ) => {
    let duplicateFloodDeck = [...cards];
    let finalGameBoard = JSON.parse(JSON.stringify(gameBoard)); 
  
    let cardCount = 0;

    for (let i = 0; i < finalGameBoard.length; i++) {
      for (let j = 0; j < finalGameBoard[i].length; j++) {
        if (finalGameBoard[i][j] === 'c') {
          finalGameBoard[i][j] = duplicateFloodDeck[cardCount]

          cardCount++
        }
      }
    }
    resolve(finalGameBoard) 
  })
  
}

let moveCardNewPile = (inbound, outbound) => {
  if (outbound.length > 0) {
      inbound.unshift(outbound.shift());
  }
};

let selectObjectById = (board, id) => {
  for (let row of board) {
      for (let tile of row) {
          if (typeof tile === 'object' && tile.id === id) {
              return tile;
          }
      }
  }
  return null;
};

let floodBoard = (room, tileCount) => {
  room.gameDetails.flood_deck.unused.forEach((val, ind) => {
      if(ind < tileCount) {
      let tile = selectObjectById(room.gameDetails.gameBoard, val.id)
      tile.flooded = true 
      moveCardNewPile(room.gameDetails.flood_deck.discard,  room.gameDetails.flood_deck.unused );
      }
  });

  return room;
};

let floodOrSink = (room) => {

  let tile = room.gameDetails.flood_deck.discard[0]
  let boardTitle = selectObjectById(room.gameDetails.gameBoard, tile.id)


  if(boardTitle.flooded == true) {
    tile.sunk = true;
    boardTitle.sunk = true;
  }

  if(boardTitle.flooded == false) {
    tile.flooded = true;
    boardTitle.flooded = true; 
  }

  if(tile.sunk == true) {
    moveCardNewPile(room.gameDetails.flood_deck.removed,  room.gameDetails.flood_deck.discard )
  }

  
  return room
}


let checkForWaterRise = (room) => {
  let discardAction = room.gameDetails.action_deck.discard[0]
  if(discardAction.name == "water rises"){
    room.gameDetails.current_flood_level++
  
    if(room.gameDetails.current_flood_level == 10) {
      return 'game over'    
    } else {

      console.log('room.gameDetails.current_flood_level', room.gameDetails.current_flood_level)

      //shuffle the discard cards and place back on top of unused
      let dividedShuffleAction = dividedShuffle(room.gameDetails.flood_deck.discard, room.gameDetails.flood_deck.unused )
      room.gameDetails.flood_deck.unused = dividedShuffleAction;
      room.gameDetails.flood_deck.discard = [];

      // raise the water level
      //todo.... check if this is working..
      room.current_flood_level++
      let level = raiseTheWaterLevel(room)
      


      //flood # of card per the flood level
      let updatedRoom = floodBoard(room, level)
      room = updatedRoom


      return room
    }
  } else {
    return false;
  }

}



let checkTreasureSunk = (board, treasure) => {
  let treasureCount = 0;
  let flatten = board.flat()

  flatten.forEach((tile, ind) => {
      if (tile.treasure === treasure && tile.sunk == false) {
          treasureCount++
      }
  })

  if(treasureCount == 0) {
      return true
  }

  return false;
}


let checkForPlayerLost = (room) => {

    if(room.gameDetails.current_flood_level >= 10 ) {
      return true;
    }
       //- Wind is sunk under
    if(checkTreasureSunk(room.gameDetails.gameBoard, TREASURES.wind_treasure )) {
      return true;
    }
    
    //- Fire is sunk under
    if(checkTreasureSunk(room.gameDetails.gameBoard, TREASURES.fire_treasure )) {
      return true;
    }
    
    //- Water is sunk under
    if(checkTreasureSunk(room.gameDetails.gameBoard, TREASURES.water_treasure )) {
      return true;
    }
    
    //- Earth is sunk under
    if(checkTreasureSunk(room.gameDetails.gameBoard, TREASURES.earth_treasure )) {
      return true;
    }
    
    
   // - fools Landing is sunk under
    let fools_landing = selectObjectById(room.gameDetails.gameBoard, 9)
    if(fools_landing.sunk == true) {
      return true;
    }


    return false;
    
    
    //TODO
    //- check players location
    //- isDrowning

}

let checkForPlayerWon = () => {
  return new Promise((resolve) => {
    
    //if all 4 treasure are captured

    //if all player are located on fools landing

    //if a player last discard was helicopter

    resolve()
  })
}

let setDifficulty = (playerDifficuly) => {
    return new Promise(resolve => {
        game_details.current_flood_level = playerDifficuly;
        resolve();
    });
}
// Function to reset the game state
let resetGame = () => {
  // Reset game_board and game_details to their initial states
  game_board = [
    ['x', 'x', 'c', 'c', 'x', 'x'],
    ['x', 'c', 'c', 'c', 'c', 'x'],
    ['c', 'c', 'c', 'c', 'c', 'c'],
    ['c', 'c', 'c', 'c', 'c', 'c'],
    ['x', 'c', 'c', 'c', 'c', 'x'],
    ['x', 'x', 'c', 'c', 'x', 'x'],
]

  game_details = {
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
    number_of_players: null,
    current_player: null,
    current_player_turns_left: null,
    gameBoard: game_board,
    status: GAME_STATUS.notStarted,
    current_flood_level: 1
}; 

 
}

// Exported functions to be used in routes and sockets
module.exports = {
    raiseTheWaterLevel,
    placeTilesOnBoard,
    checkTreasureSunk,
    checkForPlayerLost,
    checkForPlayerWon,
    setDifficulty,
    resetGame,
    moveCardNewPile,
    floodOrSink,
    floodBoard,
    checkForWaterRise
};
