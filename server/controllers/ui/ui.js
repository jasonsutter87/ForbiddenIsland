//Handles user interface interactions, updating the display, managing the HUD, and responding to player input.
const { game_details } = require('../game-logic/board'); // Relative path
const { playerMoveOrActionModal } = require('../ui/modal'); // Relative path


function createBoardUI(board) {
  return new Promise(resolve => {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = ''; // Clear any existing content
  
    // Create the grid
    for (let row = 0; row < board.length; row++) {
      const rowElement = document.createElement('div');
      rowElement.className = 'row'; // Optional: style rows separately
      for (let col = 0; col < board[row].length; col++) {
        const tileData = board[row][col];
        const tile = document.createElement('div');
        tile.className = 'tile'; // Basic styling for each tile
        // Handle different tile data cases
        if (tileData === 'x') {
          tile.classList.add('blocked');
        } else if (tileData.flooded) {
            tile.setAttribute('cardId' , tileData.id); 
            tile.classList.add('flooded');
            tile.onclick = () => playerMoveOrActionModal(tileData.id);
            const img = document.createElement('img');
              img.src = `./assets/images/flooded-tiles/${tileData.slug}.jpeg`; // Adjust the extension if needed
              img.alt = tileData.name; // Optional: add alt text for accessibility
            tile.appendChild(img);
        } else {
           tile.setAttribute('cardId' , tileData.id); 
           tile.classList.add('normal');
           tile.onclick = () => playerMoveOrActionModal(tileData.id);
           // Create and append the image element
           const img = document.createElement('img');
           img.src = `./assets/images/game-tiles/${tileData.slug}.jpeg`; // Adjust the extension if needed
           img.alt = tileData.name; // Optional: add alt text for accessibility
           tile.appendChild(img);
        }
  
        if (tileData.sunk) {
          tile.setAttribute('cardId' , tileData.id); 
          tile.classList.add('sunk');
        }

        rowElement.appendChild(tile);
      }
      boardElement.appendChild(rowElement);
    }
    resolve();
  });
 }
  
let redrawBoardUI = (board) => {
  return new Promise(resolve => {
    createBoardUI(board)

    // $(() => {

    //   $('.tile').each(function() {
    //     const classes = $(this).attr('class').split(/\s+/);
    //     const playerClasses = classes.filter(cls => cls.startsWith('player-active-'));
    
    //     if (playerClasses.length > 1) {
    //         // Add the combined-border class
    //         $(this).addClass('combined-border');
  
    //         // Define colors based on player classes
    //         const colors = playerClasses.map(playerClass => {
    //             switch (playerClass) {
    //               case 'player-active-Diver':
    //                 return '#000000'; // Example color for Diver
    //               case 'player-active-Pilot':
    //                   return '#0000ff'; // Example color for Diver
    //               case 'player-active-Messenger':
    //                     return '#c0c0c0'; // Example color for Diver
    //               case 'player-active-Explorer':
    //                     return '##008000'; // Example color for Diver
    //                 case 'player-active-Engineer':
    //                     return '#ff0000'; // Example color for Explorer
    //                 case 'player-active-Navigator':
    //                   return '#ffff00'; // Example color for Explorer
    //               // Add more cases for other player classes
    //                 default:
    //                     return '#FFFFFF'; // Fallback color
    //             }
    //         });
    
    //         // Apply the gradient based on the number of colors
    //         if (colors.length === 2) {
    //             $(this).css('border-image-source', `linear-gradient(to right, ${colors[0]}, ${colors[1]})`);
    //         } else if (colors.length === 3) {
    //             $(this).css('border-image-source', `linear-gradient(to right, ${colors[0]}, ${colors[1]}, ${colors[2]})`);
    //         }
    //         // Continue for more colors if needed
    //     }
    // });
    
    
    //  })
    resolve();
  });
 } 


const findPlayerCoordinates = (playerName) => {
  // Get all rows in the board
  const rows = document.querySelectorAll('#board .row');

  // Loop through each row
  for (let row = 0; row < rows.length; row++) {
      // Get all tiles in the current row
      const tiles = rows[row].querySelectorAll('.tile');

      // Loop through each tile
      for (let col = 0; col < tiles.length; col++) {
          // Check if the tile contains the player's piece
          const playerPiece = tiles[col].querySelector(`.player-piece[player="${playerName}"]`);

          // If the player piece is found, return the coordinates
          if (playerPiece) {
              return { row: row, col: col };
          }
      }
  }

  // If the player is not found, return null
  return null;
}


let getAdjacentTileIds = (board, playerPosition) => {
  let directions;
  if(game_details.current_player.name == "Explorer"){
    directions = [
      { row: -1, col: 0 },  // Above
      { row: 1, col: 0 },   // Below
      { row: 0, col: -1 },  // Left
      { row: 0, col: 1 },   // Right
      { row: -1, col: -1 }, // Top-left diagonal
      { row: -1, col: 1 },  // Top-right diagonal
      { row: 1, col: -1 },  // Bottom-left diagonal
      { row: 1, col: 1 }    // Bottom-right diagonal
  
    ] ;
  } else {
    directions = [
       { row: -1, col: 0 },  // Above
       { row: 1, col: 0 },   // Below
       { row: 0, col: -1 },  // Left
       { row: 0, col: 1 },   // Right
   ];
  }

   return directions.map(direction => ({
      row: playerPosition.row + direction.row,
      col: playerPosition.col + direction.col
  }))
  .filter(tile =>
      // Ensure the tile is within the bounds of the board and not 'x'
      tile.row >= 0 && tile.row < board.length &&
      tile.col >= 0 && tile.col < board[0].length &&
      typeof board[tile.row][tile.col] === 'object'
  )
  .map(tile => board[tile.row][tile.col].id);
}


module.exports = {
  createBoardUI,
  redrawBoardUI,
  findPlayerCoordinates,
  getAdjacentTileIds
}
