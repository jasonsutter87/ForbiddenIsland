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

import { floodSix, game_board, game_details, game_status, placeTilesOnBoard, checkForPlayerLost } from '/src/js/game-logic/board.js';
import { StartGameModal } from '/src/js/ui/modal.js';
import { createBoardUI, redrawBoardUI } from '/src/js/ui/ui.js';
import { ACTION_CARDS, FLOOD_CARDS } from '/src/js/game-logic/tile.js';
import { shuffle, dividedShuffle, shuffleActionCards, shuffleFloodCards, shufflePlayerCards  } from '/src/js/game-machanics/shuffling.js';
import { PLAYER_CARDS, setDifficulty } from '/src/js/game-logic/player.js';

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

let showDetails = () => {
    return new Promise( resolve => {
            console.log('game_details', game_details)
        resolve();
    })
}

function game_setup(game_board, FLOOD_CARDS, ACTION_CARDS, PLAYER_CARDS, playerDifficuly) {
    addToQueue(setDifficulty, playerDifficuly);
    addToQueue(shuffleActionCards, ACTION_CARDS);
    addToQueue(shuffleFloodCards, FLOOD_CARDS);
    addToQueue(shufflePlayerCards, PLAYER_CARDS);
    addToQueue(placeTilesOnBoard, game_board, FLOOD_CARDS);
    addToQueue(createBoardUI, game_board);
}


let gameloop = () => {
    return new Promise( (resolve) => {
        let count = 0 ;

        while (game_details.status !== game_status.lost || game_details.status !== game_status.won  ) { 
            // Game logic goes here

            if(game_details.status === game_status.won ){
                resolve(game_status.won);
            }
            if(game_details.status === game_status.lost ){
                resolve(game_status.lost);
            }


            addToQueue(checkForPlayerLost, 5, count);
            

            if(count >= 100) {
                
                // temp not to break the game
                game_details.status === game_status.lost
                resolve(game_status.won);
                return
            } else {
                count++
            }
        }


        resolve(game_status)
    })
}

// Game runner function
let game_runner = () => {
    return new Promise(async (resolve) => {
        // Game Set up
        let StartGameModalResults = StartGameModal;
        game_setup(game_board, FLOOD_CARDS, ACTION_CARDS, PLAYER_CARDS, StartGameModalResults.playerDifficuly);
        addToQueue(StartGameModalResults);

        //////////////////
        //  Game Start  //
        //////////////////

        // Flood six cards
        addToQueue(floodSix, FLOOD_CARDS);

        // Redraw UI
        addToQueue(redrawBoardUI, game_board);

        // Log game details
        addToQueue(showDetails)

        // // Main game loop
        addToQueue(gameloop)
    });
}

// Runner
game_runner().then(result => {
    if(result === game_status.won ) {
        console.log('Game Won!');
    } else {
        console.log('Game Lost.');
    }
});
