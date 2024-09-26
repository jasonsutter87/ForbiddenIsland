import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';


1. Connect to Socket.io server
const serverUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://forbiddenisland.onrender.com';

// Connect to the Socket.io server
const socket = io(serverUrl);


// const socket = io('http://localhost:3000');



// Define createBoardUI as a separate function
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
        resolve();
    });
}

socket.on('setPlayersOnBoard', (game_details) => {

        // set player on board.
        game_details.players.forEach((val, int) => {
            let playerName = val.name
            
            let flattenBoard = game_details.gameBoard.flat();
            // -- use FLOOD_CARDS to get the tile that matchs players name 
            let result = flattenBoard.find(item => item && item.starting_position === playerName);
      
            $(() =>  {    
          
              if(result.starting_position == game_details.current_player.name) {
                $(`.tile[cardid="${result.id}"]`).addClass(`player-active-${game_details.current_player.name}`)
              }
              
              // use the players starting tile ID, place player on the tile that matchs
              $(`.tile[cardid="${result.id}"]`).append(`
                <img src="/assets/images/players/${playerName}.png" class="player-piece" player='${playerName}' playerId='${game_details.current_player.id}' >
              `)
            })
      
          })
          
})

socket.on('settingRoomName', (data) => {
    socket.roomName = data
})



// 4. Fetch game state from REST API
fetch('http://localhost:3000/api/game/state')
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


///////////


//SOCKETS TODOS


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
    $('main').append('<div id="board"></div>')
    createBoardUI(board)
})


socket.on('setGameLayout', (id) => {
    $(()=> {
        $('#selectGameLayout').val(id);
    })
})

/////////////////////game play

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






