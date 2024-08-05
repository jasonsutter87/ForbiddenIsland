// Import forbiddenisland.js
import './forbiddenisland.js';

// Function to set up the board
function createBoard(board) {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = ''; // Clear any existing content

  // Create the grid
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const tile = document.createElement('div');
      tile.className = 'tile'; // Basic styling for each tile

      // Add classes based on tile properties (for example)
      if (board[row][col] === 'flooded') {
        tile.classList.add('flooded');
      } else if (board[row][col] === 'sunk') {
        tile.classList.add('sunk');
      }

      boardElement.appendChild(tile);
    }
  }
}

// Example board setup (for demonstration)
const exampleBoard = [
  ['c', 'c', 'c', 'c', 'c', 'c'],
  ['c', 'c', 'c', 'c', 'c', 'c'],
  ['c', 'c', 'c', 'c', 'c', 'c'],
  ['c', 'c', 'c', 'c', 'c', 'c'],
  ['c', 'c', 'c', 'c', 'c', 'c'],
  ['c', 'c', 'c', 'c', 'c', 'c'],
];



// Set up the board when the window loads
window.onload = () => {
  createBoard(exampleBoard);
};
