// Handles the setup of the game board, including placing tiles, managing the board state, and updating the board as the game progresses.
const { TREASURES, GAME_STATUS } = require("../../Enums/enums.js");
let { game_details } = require("../../models/models.js");
const { dividedShuffle  } = require('../../controllers/game-machanics/shuffling')

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
    const movedItem = outbound.shift();
    inbound.unshift(movedItem);
    return movedItem;
  }
  return null; 
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
       moveCardNewPile(room.gameDetails.flood_deck.discard,  room.gameDetails.flood_deck.unused );
      }
  })

  room.gameDetails.flood_deck.discard.forEach((val, ind) => {
  let tile = selectObjectById(room.gameDetails.gameBoard, val.id)
  tile.flooded = true;
})

  return room;
};

let unFloodTile = (room, id) => {
  let boardTitle = selectObjectById(room.gameDetails.gameBoard, id)

  if(boardTitle.flooded == true) {
    boardTitle.flooded = false
  }

 return room
}

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

let checkForWaterRise = ({
  io = null,          
  room = {},          
  ...rest            
} = {}) => {
  let discardAction = room.gameDetails.action_deck.discard[0]

  if(discardAction && discardAction.name == "water rises"){

  
    if(room.gameDetails.current_flood_level == 10) {
      return 'game over'    
    } else {
      io.to(room.name).emit('updateFloodLevelUI', room); 
      
      //shuffle the discard cards and place back on top of unused
      let dividedShuffleAction = dividedShuffle(room.gameDetails.flood_deck.discard, room.gameDetails.flood_deck.unused )
      room.gameDetails.flood_deck.unused = dividedShuffleAction;
      room.gameDetails.flood_deck.discard = [];


      let current_flood_level = room.gameDetails.current_flood_level++
      if (current_flood_level == 8) {
        room.gameDetails.flood_deal_count = 5;
      } else if (current_flood_level == 6) {
        room.gameDetails.flood_deal_count = 4;
      } else if (current_flood_level == 3) {
        room.gameDetails.flood_deal_count = 3;
      }


      //flood # of card per the flood level
      let updatedRoom = floodBoard(room, room.gameDetails.flood_deal_count)
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
    captured_treasures: [],
    number_of_players: null,
    current_player: null,
    current_player_turn: { number_of_actions: 0, action_cards_deal: 0, flood_cards_deal: 0 },
    gameBoard: game_board,
    current_flood_level: 1
}; 

 
}

let floodByWaterLevel = (floodDeck, waterLevel) => {
  for (let i = 0; i < waterLevel; i++) {
    if (floodDeck.length > 0) {
      let val = floodDeck.shift();
      let tile = selectObjectById(game_board, val.id);
      if (tile) {
        tile.flooded = true;
        moveCardNewPile(flood_discard, [val]);
      }
    }
  }
}; 






// Exported functions to be used in routes and sockets
module.exports = {
    placeTilesOnBoard,
    checkTreasureSunk,
    checkForPlayerLost,
    checkForPlayerWon,
    setDifficulty,
    resetGame,
    moveCardNewPile,
    floodOrSink,
    floodBoard,
    checkForWaterRise,
    unFloodTile,
    floodByWaterLevel
};
