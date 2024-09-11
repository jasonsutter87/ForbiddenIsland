// // Handles the setup of the game board, including placing tiles, managing the board state, and updating the board as the game progresses.
// import { selectObjectById } from "../utilities/utils.js";
// import { moveCardNewPile } from "../game-machanics/cards.js"
// import { shuffle } from "../game-machanics/shuffling.js";
// import { TREASURES  } from "./tile.js";

// export let game_board = [
//     ['x', 'x', 'c', 'c', 'x', 'x'],
//     ['x', 'c', 'c', 'c', 'c', 'x'],
//     ['c', 'c', 'c', 'c', 'c', 'c'],
//     ['c', 'c', 'c', 'c', 'c', 'c'],
//     ['x', 'c', 'c', 'c', 'c', 'x'],
//     ['x', 'x', 'c', 'c', 'x', 'x'],
// ]

// export let raiseTheWaterLevel = () => { 
//     flood_level++
//       switch (true) {
//         case (flood_level >= 8):
//           flood_draw_count = 5;
//           break;
//         case (flood_level >= 6):
//           flood_draw_count = 4;
//           break;
//         case (flood_level >= 3):
//           flood_draw_count = 3;
//           break;
//         default:
//           flood_draw_count = 2; // Base case
//       }
// } 
  
// export let floodByWaterLevel = (floodDeck, waterLevel) => {
//     for (let i = 0; i < waterLevel; i++) {
//       if (floodDeck.length > 0) {
//         let val = floodDeck.shift();
//         let tile = selectObjectById(game_board, val.id);
//         if (tile) {
//           tile.flooded = true;
//           moveCardNewPile(flood_discard, [val]);
//         }
//       }
//     }
// };

// export let placeTilesOnBoard = (gameBoard, FLOOD_CARDS) => {
//   return new Promise(( resolve ) => {
//     let duplicateFloodDeck = FLOOD_CARDS.slice();

//     for (let i = 0; i < gameBoard.length; i++) {
//       for (let j = 0; j < gameBoard[i].length; j++) {
//         if (gameBoard[i][j] === 'c') {
//           gameBoard[i][j] = duplicateFloodDeck.shift();
//         }
//       }
//     }
//     resolve()
//   })
  
// }

// export let floodSix = (game_board) => {
//   shuffle(game_board)

//   game_details.flood_deck.unused = game_board
//   game_details.flood_deck.unused.forEach((val, ind) => {
//       if(ind < 6) {
//       let tile = selectObjectById(game_details.gameBoard, val.id)
//       tile.flooded = true 
//       moveCardNewPile(game_details.flood_deck.discard,  game_details.flood_deck.unused );
//       }
//   });
// };

// export let game_status = {
//   notStarted: 'Not Started',
//   inProgress: 'In Progress',
//   lost: 'Lost',
//   won: 'Won'
// }

// export let game_details = {
//   flood_deck: {
//     discard: [],
//     unused: [],
//     removed: []
//   },
//   action_deck: {
//     discard: [],
//     unused: [],
//   },
//   players: [],
//   number_of_players: null,
//   current_player: null,
//   current_player_turns_left: null,
//   gameBoard: game_board,
//   status: game_status.notStarted,
//   current_flood_level: 0
// }

// function checkTreasureSunk(board, treasure) {
//   // Flatten the board to simplify filtering
//   const tiles = board.flat().filter(tile => typeof tile === 'object');

//   // Filter the tiles that match the given treasure
//   const matchingTiles = tiles.filter(tile => tile.treasure === treasure);

//   // If no matching tiles are found, return true
//   if (matchingTiles.length === 0) {
//       return true;
//   }

//   // Check if all matching tiles have "sunk": false
//   return !matchingTiles.every(tile => tile.sunk === false);
// }

// export let checkForPlayerLost = (cardId, count) => {
//   return new Promise(resolve => {

//     console.log('checking if Player Lost Attempt:' +  count)
//     //- check water level < 10
//     if(game_details.current_flood_level >= 10 ) {
//       resolve(true);
//     }
//        //- Wind is sunk under
//     if(checkTreasureSunk(game_details.gameBoard, TREASURES.wind_treasure )) {
//       resolve(true);
//     }
    
//     //- Fire is sunk under
//     if(checkTreasureSunk(game_details.gameBoard, TREASURES.fire_treasure )) {
//       resolve(true);
//     }
    
//     //- Water is sunk under
//     if(checkTreasureSunk(game_details.gameBoard, TREASURES.water_treasure )) {
//       resolve(true);
//     }
    
//     //- Earth is sunk under
//     if(checkTreasureSunk(game_details.gameBoard, TREASURES.earth_treasure )) {
//       resolve(true);
//     }
    
    
//     //- fools Landing is sunk under
//     let fools_landing = selectObjectById(game_details.gameBoard, cardId)
//     if(fools_landing.sunk == true) {
//       resolve(true);
//     }
    
    
//     //TODO
//     //- check players location
//     //- isDrowning

//     resolve(false);
// });
// }

// export let checkForPlayerWon = () => {
//   return new Promise((resolve) => {
    
//     //if all 4 treasure are captured

//     //if all player are located on fools landing

//     //if a player last discard was helicopter

//     resolve()
//   })
// }