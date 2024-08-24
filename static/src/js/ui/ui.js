//Handles user interface interactions, updating the display, managing the HUD, and responding to player input.
import { playerMoveOrActionModal } from '/src/js/ui/modal.js'

export function createBoardUI(board) {
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
        // console.log(board[row])
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
  
 export let redrawBoardUI = (board) => {
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


