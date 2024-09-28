// Handles the setup of the game board, including placing tiles, managing the board state, and updating the board as the game progresses.
const { TREASURES, GAME_STATUS } = require("../../Enums/enums.js");
let { game_details } = require("../../models/models.js");

let raiseTheWaterLevel = () => { 
    flood_level++
      switch (true) {
        case (flood_level >= 8):
          flood_draw_count = 5;
          break;
        case (flood_level >= 6):
          flood_draw_count = 4;
          break;
        case (flood_level >= 3):
          flood_draw_count = 3;
          break;
        default:
          flood_draw_count = 2; // Base case
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

let checkTreasureSunk = (board, treasure) => {
  // Flatten the board to simplify filtering
  const tiles = board.flat().filter(tile => typeof tile === 'object');

  // Filter the tiles that match the given treasure
  const matchingTiles = tiles.filter(tile => tile.treasure === treasure);

  // If no matching tiles are found, return true
  if (matchingTiles.length === 0) {
      return true;
  }

  // Check if all matching tiles have "sunk": false
  return !matchingTiles.every(tile => tile.sunk === false);
}

let checkForPlayerLost = (cardId, count) => {
  return new Promise(resolve => {

    // console.log(('checking if Player Lost Attempt:' +  count)
    //- check water level < 10
    if(game_details.current_flood_level >= 10 ) {
      resolve(true);
    }
       //- Wind is sunk under
    if(checkTreasureSunk(game_details.gameBoard, TREASURES.wind_treasure )) {
      resolve(true);
    }
    
    //- Fire is sunk under
    if(checkTreasureSunk(game_details.gameBoard, TREASURES.fire_treasure )) {
      resolve(true);
    }
    
    //- Water is sunk under
    if(checkTreasureSunk(game_details.gameBoard, TREASURES.water_treasure )) {
      resolve(true);
    }
    
    //- Earth is sunk under
    if(checkTreasureSunk(game_details.gameBoard, TREASURES.earth_treasure )) {
      resolve(true);
    }
    
    
    //- fools Landing is sunk under
    let fools_landing = selectObjectById(game_details.gameBoard, cardId)
    if(fools_landing.sunk == true) {
      resolve(true);
    }
    
    
    //TODO
    //- check players location
    //- isDrowning

    resolve(false);
});
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
    current_flood_level: 0
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
    resetGame
};
