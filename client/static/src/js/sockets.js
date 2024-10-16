import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import { movePlayer } from './board.js'


//1. Connect to Socket.io server
const serverUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://forbiddenisland.onrender.com';

// Connect to the Socket.io server
const socket = io(serverUrl);

// const socket = io('http://localhost:3000');

let gameRoom;


socket.on('setPlayersOnBoard', (room) => {
    console.log(room)
    gameRoom = room;
    room.gameDetails.players.forEach((val, int) => {
        let playerName = val.name
        
        let flattenBoard = room.gameDetails.gameBoard.flat();

        let result = flattenBoard.find(item => item && item.starting_position === playerName);


            setTimeout(() =>{
                if(result.starting_position == room.gameDetails.current_player.name) {
                    $(`.tile[cardid="${result.id}"]`).addClass(`player-active-${room.gameDetails.current_player.name}`)
                }
                
                $(`.tile[cardid="${result.id}"]`).append(`
                    <img src="/assets/images/players/${playerName}.png" class="player-piece" player='${playerName}' playerId='${result.current_players[0].id}' >
                `)

            }, 500) 

        
    
    })
          
})

socket.on('settingRoomName', (data) => {
    socket.roomName = data
})

///////////////////////
//     GAME_ROOM     //
///////////////////////

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

socket.on('player_disconnected', (data) => {    
    $('.ChatContentArea-wrapper').prepend(`
            <div class="toast danger">
             <p class="mb-0"><span id="incomingUser" class="bold">${data}</span> <span>has left the room</span></p>
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
    $('.joinRoomModal-wrapper').removeClass('active')
    $('.gameUI-wrapper').removeClass('d-none')
    $('main').append('<div id="board"></div>')
    createBoardUI(board)
})

socket.on('setGameLayout', (id) => {
    $('#selectGameLayout').val(id);
})

///////////////////////
//    GAME_SETUP     //
///////////////////////
socket.on('redrawBoard', (data) => {
    createBoardUI(data.gameDetails.gameBoard);

    // Flatten the game board to a single array
    const flattenBoard = data.gameDetails.gameBoard.flat();
   

    flattenBoard.forEach((item) => {
        if (item.current_players && item.current_players.length > 0) {
            const playerName = item.current_players[0].name;

            if(item.current_players[0].name == data.gameDetails.current_player.name){
                // Log the player being appended to the tile
                console.log('Appending player:', playerName, 'to tile:', item.id);
    
                // Add active class to the current player's tile if it matches
                $(`.tile[cardid="${item.id}"]`).addClass(`player-active-${playerName}`);
            }


            // // Use setTimeout to append the player piece to the tile with a delay
            setTimeout(() => {
                appendPlayerPiece(item.id, playerName);
            }, 1500);
        }
    })
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

socket.on('setCurrentPlayer', (data) => {
    $('.clients-current-players-name span').addClass(data.name)
    $('.clients-current-players-name span').html(data.name)
})

socket.on('updateClientsPlayer', (data) => {
    data.gameDetails.players.forEach((player, index) => {
        if(socket.id === player.socketId.socketId) {
            socket.playerName = player.name
            $('.clients-players-name span').html(player.name)
            $('.clients-players-name span').removeClass()
            $('.clients-players-name span').addClass(player.name)

            $('.current-player-image-wrapper').empty()
            $('.current-player-image-wrapper').append(`
                <img class="w-100" src="/assets/images/players/${player.name}-card.webp" alt="${player.name} player card to show current player">
            `)
        }
    })
})

socket.on('renderPlayerActionCards', (data) => { 
    data.gameDetails.players.forEach((player, index) => {
        $('#player-cards-ui-area').append(`
            <div class="clients-players-actions-cards sidebar-item-${index + 1}">

            <span class="${player.name} bold">${player.name}'s</span> Cards<br>
            <div id="player-${index + 1}-action-cards" class="clients-players-actions-cards-set"></div>
        </div>
        `)

        player.actionCards.forEach((card, cardIndex) => {
            $(`#player-${player.playerId}-action-cards`).append(`
                <img class="player-action-cards" src="/assets/images/action/action_${card.slug}.jpeg" alt="${card.name}">
            `)
        })

    })
})

socket.on('updateFloodLevelUI', (data) => {
        $('.flood-level-slider').css('width', `${data.gameDetails.current_flood_level * 10}%`)
        let level = data.gameDetails.current_flood_level;
        
        if (level >= 10) {
            $('.flood-level-slider').css('background', '#ff1919');
        } else if (level >= 8) {
            $('.flood-level-slider').css('background', '#010125');
        } else if (level >= 6) {
            $('.flood-level-slider').css('background', '#11118a');
        } else if (level >= 3) {
            $('.flood-level-slider').css('background', '#2c2cb1');
        } else {
            $('.flood-level-slider').css('background', '#5858da'); 
        }

        $('.current-flood-number').html(data.gameDetails.current_flood_level)
        $('.current-flood-deal-number').html(data.gameDetails.flood_deal_count)
})

///////////////////////
//    GAME_PLAY      //
///////////////////////
// Move player
socket.on('moveUIPlayer', (data) => {
    console.log('moveUIPlayer', data)




    /// Everything should be working. Refactor this to reflect.
    //Remove all player pieces
    //add again? 

    //refactor the current method flattenBoard? this would work best since the ui could be dumb








    
    

    //if and bugs happen they are here now

    // createBoardUI(data.gameDetails.gameBoard);

    // Flatten the game board to a single array
    // const flattenBoard = data.gameDetails.gameBoard.flat();
   

    // flattenBoard.forEach((item) => {
    //     if (item.current_players && item.current_players.length > 0) {
    //         const playerName = item.current_players[0].name;

    //         if(item.current_players[0].name == data.gameDetails.current_player.name){
    //             // Log the player being appended to the tile
    //             console.log('Appending player:', playerName, 'to tile:', item.id);
    
    //             // Add active class to the current player's tile if it matches
    //             $(`.tile[cardid="${item.id}"]`).addClass(`player-active-${playerName}`);
    //         }


    //         // // Use setTimeout to append the player piece to the tile with a delay
    //         setTimeout(() => {
    //             appendPlayerPiece(item.id, playerName);
    //         }, 1500);
    //     }
    // });
});



socket.on('rotateUIPlayers',  (data) => {
    console.log('rotateUIPlayers', data)

    //updatte the current player spans

    //strip all active class on the grid

    //apply new active player  class 
})


//gameover
socket.on('gameOver', () => {
    alert('gameOver!')
})



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
                    tile.onclick = () => playerMoveOrActionModal(tileData.id, socket.roomName);
                    const img = document.createElement('img');
                    img.src = `./assets/images/flooded-tiles/${tileData.slug}.jpeg`; // Adjust the extension if needed
                    img.alt = tileData.name; // Optional: add alt text for accessibility
                    tile.appendChild(img);
                } else {
                    tile.setAttribute('cardId', tileData.id);
                    tile.classList.add('normal');
                    tile.onclick = () => playerMoveOrActionModal(tileData.id, socket.roomName);
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

// Function to append the player piece to the tile
function appendPlayerPiece(tileId, playerName) {
    const tileSelector = `.tile[cardid="${tileId}"]`;
    
    // Append player piece
    $(tileSelector).append(`
        <img src="/assets/images/players/${playerName}.png" class="player-piece" player='${playerName}' playerId='${tileId}'>
    `);
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
  
let getAdjacentTileIds = (game_details, board, playerPosition) => {

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

let playerMoveOrActionModal = (toId, roomName) => {         
    let game_details;

    socket.emit('getRoomDetails', roomName, (roomDetails) => {
    game_details =  roomDetails.gameDetails;


    if(socket.playerName == game_details.current_player.name) {
        if(game_details.current_player_turn.number_of_actions < 3) {
            let fromId = $('[class*="player-active-"]').attr('cardid');
  
            let currentPlayersLocation = findPlayerCoordinates(game_details.current_player.name)
            let adjacentTileIds = getAdjacentTileIds(game_details, game_details.gameBoard, currentPlayersLocation)
            let result = adjacentTileIds.find(x => x == toId)
            
            if(result) {  
                if(fromId != toId ) {
                movePlayer(roomName, fromId, toId)
                }
            }
        } else {
            alert('player needs to pull 2 action card')
        }
    } else {
        alert('Its Not your turn yo  🤡')
    }
    
});

}
  
export { socket, gameRoom };






