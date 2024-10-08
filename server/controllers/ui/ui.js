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

   
    resolve();
  });
} 



module.exports = {
  createBoardUI,
  redrawBoardUI,
  findPlayerCoordinates,
  getAdjacentTileIds
}
