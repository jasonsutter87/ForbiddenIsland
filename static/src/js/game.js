// Import forbiddenisland.js
import './forbiddenisland.js';
import { game_board } from './lookups.js';

// Function to set up the board
function createBoard(board) {
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

      console.log(tile)

      // Handle different tile data cases
      if (tileData === 'x') {
        tile.classList.add('blocked');
      } else if (tileData.flooded) {
        tile.classList.add('flooded');
          const img = document.createElement('img');
            img.src = `./assets/images/flooded-tiles/${tileData.slug}.jpeg`; // Adjust the extension if needed
            img.alt = tileData.name; // Optional: add alt text for accessibility
          tile.appendChild(img);
      } else {
        tile.classList.add('normal');
         // Create and append the image element
         const img = document.createElement('img');
         img.src = `./assets/images/game-tiles/${tileData.slug}.jpeg`; // Adjust the extension if needed
         img.alt = tileData.name; // Optional: add alt text for accessibility
         tile.appendChild(img);
      }

      if (tileData.sunk) {
        tile.classList.add('sunk');
      }

      // Add content or additional classes based on other properties
      if (tileData.name) {
       
      }

      rowElement.appendChild(tile);
    }
    boardElement.appendChild(rowElement);
  }
}

game_board;
// Set up the board when the window loads
window.onload = () => {
  createBoard(game_board);
};
