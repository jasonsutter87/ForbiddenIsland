/*
TODO:

    ////Game Loop
        //Win Condition
        - Check for win condition

        //Player Turn
        - 3 Actions
        - Draw Action Cards
        - Draw Flood Cards

*/

//This file will serve as the main entry point for the game


const { setDifficulty, placeTilesOnBoard } = require('../game-logic/board');
const { StartGameModal } = require('../ui/modal');
const { shuffleCards } = require('../game-machanics/shuffling');
const { game_board, game_details, FLOOD_CARDS, ACTION_CARDS, PLAYER_CARDS } = require('../../models/models');


let gameQueue = [];
let isProcessing = false;
    
// Queue management functions
function addToQueue(fn, ...args) {
    gameQueue.push(() => fn(...args));
    processQueue();
}

async function processQueue() {
    if (isProcessing || gameQueue.length === 0) return;

    isProcessing = true;
    const fn = gameQueue.shift();

    await fn();  // Wait for the function to finish

    isProcessing = false;
    processQueue();  // Process the next function
}

let socket;

function initialize(sock) {
    socket = sock; // Store the socket instance
}

let showDetails = () => {
    return new Promise( resolve => {
            console.log('game_details', game_details)
        resolve();
    })
}

function game_setup(game_board, FLOOD_CARDS, ACTION_CARDS, PLAYER_CARDS, playerDifficuly) {
    addToQueue(setDifficulty, playerDifficuly);
    addToQueue(shuffleCards, ACTION_CARDS, game_details.action_deck);
    addToQueue(shuffleCards, FLOOD_CARDS);
    addToQueue(shuffleCards, PLAYER_CARDS);
    addToQueue(placeTilesOnBoard, game_board, FLOOD_CARDS);
}


// let gameloop = () => {
//     return new Promise( (resolve) => {
//         let count = 0 ;

//         while (game_details.status !== game_status.lost || game_details.status !== game_status.won  ) { 
//             // breakpoints to stop game loops
//             if(game_details.status === game_status.won ){
//                 resolve(game_status.won);
//             }
//             if(game_details.status === game_status.lost ){
//                 resolve(game_status.lost);
//             }

//             //check if player lost
//             addToQueue(checkForPlayerLost, 5, count);

//             // check if player won 
//             addToQueue(checkForPlayerWon);

//             //player Action or Move
//             addToQueue(playerMoveOrActionModal);



//             //Todo  
//             if(count >= 2) {
                
//                 // temp not to break the game
//                 game_details.status === game_status.lost
//                 resolve(game_status.won);
//                 return
//             } else {
//                 count++
//             }
//         }


//         resolve(game_status)
//     })
// }

// // Game runner function

let game_runner = () => {
    return new Promise(async (resolve) => {
        console.log('new game');
        // // Game Set up
        // StartGameModal()


        // //////////////////
        // //  Game Start  //
        // //////////////////

        // // Flood six cards
        // addToQueue(floodSix, FLOOD_CARDS);

        // // Redraw UI
        // addToQueue(redrawBoardUI, game_board);

  
        // // Log game details
        addToQueue(showDetails)
       


        // // // Main game loop
        // addToQueue(gameloop)
    });
}


module.exports = {
    game_setup,
    initialize,
    game_runner,
}