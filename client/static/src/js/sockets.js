import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import { floodSix } from './board.js';

// 1. Connect to Socket.io server
const serverUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://forbiddenisland.onrender.com';

// Connect to the Socket.io server
const socket = io(serverUrl);


// const socket = io('http://localhost:3000');



// Define createBoardUI as a separate function
function createBoardUI(board) {
    console.log(board)
    return new Promise(resolve => {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = ''; // Clear any existing content

        boardElement.style.gridTemplateColumns = `repeat(${board[0].length}, 1fr)`;
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
                    tile.setAttribute('cardId', tileData.id);
                    tile.classList.add('flooded');
                    tile.onclick = () => playerMoveOrActionModal(tileData.id);
                    const img = document.createElement('img');
                    img.src = `./assets/images/flooded-tiles/${tileData.slug}.jpeg`; // Adjust the extension if needed
                    img.alt = tileData.name; // Optional: add alt text for accessibility
                    tile.appendChild(img);
                } else {
                    tile.setAttribute('cardId', tileData.id);
                    tile.classList.add('normal');
                    tile.onclick = () => playerMoveOrActionModal(tileData.id);
                    // Create and append the image element
                    const img = document.createElement('img');
                    img.src = `./assets/images/game-tiles/${tileData.slug}.jpeg`; // Adjust the extension if needed
                    img.alt = tileData.name; // Optional: add alt text for accessibility
                    tile.appendChild(img);
                }

                if (tileData.sunk) {
                    tile.setAttribute('cardId', tileData.id);
                    tile.classList.add('sunk');
                }

                rowElement.appendChild(tile);
            }
            boardElement.appendChild(rowElement);
        }

        // append div#board to .main-content
        document.querySelector('#game-ui .wrapper .main-content').appendChild(boardElement);
      
        resolve();
    });
}

socket.on('setPlayersOnBoard', (room) => {
    console.log('setPlayersOnBoard', room)
        room.gameDetails.players.forEach((val, int) => {
            let playerName = val.name
            console.log('playerName', playerName)
            
            let flattenBoard = room.gameDetails.gameBoard.flat();

            console.log('flattenBoard', flattenBoard)
            
            let result = flattenBoard.find(item => item && item.starting_position === playerName);

            console.log('result', result)

            $(() =>  { 
                console.log('in jquery ready in setPlayersOnBoard')   
              if(result.starting_position == room.gameDetails.current_player.name) {
                $(`.tile[cardid="${result.id}"]`).addClass(`player-active-${room.gameDetails.current_player.name}`)
              }
              
              $(`.tile[cardid="${result.id}"]`).append(`
                <img src="/assets/images/players/${playerName}.png" class="player-piece" player='${playerName}' playerId='${result.current_players.id}' >
              `)
            })
      
          })
          
})

socket.on('settingRoomName', (data) => {
    socket.roomName = data
})

// 4. Fetch game state from REST API
fetch(`${serverUrl}/api/game/state`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('gameState').innerText = `Game state: ${JSON.stringify(data)}`;
    })
    .catch(error => console.error('Error fetching game state:', error));
   

//Handle connection  
socket.on('connect', () => {
});

// Handle disconnection
socket.on('disconnect', () => {
});


///////////////////////
//     GAME_ROOM     //
///////////////////////

//game room - receive message
socket.on('incomingGameMessage', (data, id) => {
    $('#ChatContentArea').append(`<li>
        <span>
            <img class="userimage" src="https://robohash.org/${id}"> 
        </span>
        <span>
            ${data}
        </span>
    </li>`); 
})

//game room - set incoming player name
socket.on('incomingNewPlayer', (data) => {    
    $('.ChatContentArea-wrapper').prepend(`
            <div class="toast success">
             <p class="mb-0"><span id="incomingUser" class="bold">${data}</span> <span>has entered the room</span></p>
         </div>
        `)

        setTimeout(() => {
            $('.toast').remove();
        }, 3000)
})

socket.on('number_of_players_in_room', data => {
    $('#playersInTheRoomNumber').empty();
    if(data == 1) {
        $('#playersInTheRoomNumber').append(`
            <p class="mb-0">${data} player is in the room</p>
        `)
    } else {
        $('#playersInTheRoomNumber').append(`
             <p class="mb-0">${data} players are in the room</p>
        `)
    }
})

socket.on('startGame', (board) => {
    $('#joinRoomModal').remove()
    $('.joinRoomModal-wrapper').remove()
    $('.gameUI-wrapper').removeClass('d-none')
    $('main').append('<div id="board"></div>')
    createBoardUI(board)
})

socket.on('setGameLayout', (id) => {
    $(()=> {
        $('#selectGameLayout').val(id);
    })
})


///////////////////////
//    GAME_SETUP     //
///////////////////////
socket.on('redrawBoard', (data) => {
    createBoardUI(data.gameBoard)

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
})


socket.on('floodSix', (data)=> {
    floodSix(data)
    createBoardUI(data.gameDetails.gameBoard)
})




///////////////////////
//    GAME_PLAY      //
///////////////////////

//move player
//flood tile
//sink tile

//deal action card
//deal flood card

//raise the water

//sandbag Tile
//helicopter Tile
//helicopter takeoff


//capture Earth Stone
//capture Wind Statue
//capture Fire Statue
//capture Water Statue

export { socket };






