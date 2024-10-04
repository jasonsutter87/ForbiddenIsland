import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

//1. Connect to Socket.io server
// const serverUrl = window.location.hostname === 'localhost' 
//     ? 'http://localhost:3000' 
//     : 'https://forbiddenisland.onrender.com';

// Connect to the Socket.io server
// const socket = io(serverUrl);


const socket = io('http://localhost:3000');
let gameRoom;


// Define createBoardUI as a separate function
function createBoardUI(board) {
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
    gameRoom = room;
        room.gameDetails.players.forEach((val, int) => {
            let playerName = val.name
            
            let flattenBoard = room.gameDetails.gameBoard.flat();

            let result = flattenBoard.find(item => item && item.starting_position === playerName);


            $(() =>  { 
  


               setInterval(() =>{
                   if(result.starting_position == room.gameDetails.current_player.name) {
                     $(`.tile[cardid="${result.id}"]`).addClass(`player-active-${room.gameDetails.current_player.name}`)
                   }
                   
                   $(`.tile[cardid="${result.id}"]`).append(`
                     <img src="/assets/images/players/${playerName}.png" class="player-piece" player='${playerName}' playerId='${result.current_players[0].id}' >
                   `)

               }, 1000) 

            })
      
          })
          
})

socket.on('settingRoomName', (data) => {
    socket.roomName = data
})

// 4. Fetch game state from REST API
// fetch('http://localhost:3000/api/game/state')
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById('gameState').innerText = `Game state: ${JSON.stringify(data)}`;
//     })
//     .catch(error => console.error('Error fetching game state:', error));
   

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
    createBoardUI(data.gameDetails.gameBoard)
})


socket.on('floodBoard', (data)=> {
    createBoardUI(data.gameDetails.gameBoard)
})



socket.on('floodDeckUnusedCount0', ()=> {
    $('#floodDiscardPile').empty()
    $('#dealFloodCard').empty()
    $('#dealFloodCard').append(`
        <img class="ui-cards backs" src="/assets/images/flood/flood_card-back.jpeg" alt="">
    `)    
})


socket.on('floodDeckDiscard', (data)=> {
    $('#floodDiscardPile').empty()
    $('#floodDiscardPile').append(`
        <img class="ui-cards" src="/assets/images/flood/${data.gameDetails.flood_deck.discard[0].slug}.jpeg" alt="${data.gameDetails.flood_deck.discard[0].name}">
    `) 
})


socket.on('actionDeckUnusedCount0', () => {
        $('#actionDiscardPile').empty()
        $('#dealActionCard').empty()
        $('#dealActionCard').append(`
            <img class="ui-cards backs" src="/assets/images/action/action_card-back.jpeg" alt="">
        `)    
})


socket.on('actionDeckDiscard', (data)=> {
    $('#actionDiscardPile').empty()
    $('#actionDiscardPile').append(`
        <img class="ui-cards" src="/assets/images/action/action_${data.gameDetails.action_deck.discard[0].slug}.jpeg" alt="${data.gameDetails.action_deck.discard[0].name}">
    `) 
})

socket.on('updateCurrentPlayerImage', (data) => {
    $('.current-player-image-wrapper').empty()
    $('.current-player-image-wrapper').append(`
        <img class="w-100" src="/assets/images/players/${data}-card.webp" alt="${data} player card to show current player">
    `)
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


//gameover
socket.on('gameOver', () => {
    alert('gameOver!')
})

export { socket, gameRoom };






