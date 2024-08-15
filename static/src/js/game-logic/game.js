/*
TODO:

    ////Game Loop
        //Win Condition
        - Check for win condition
        - Check for lose condition
            - check water level < 10
            - check players location
            - isDrowning
            - Wind is sunk under
            - Fire is sunk under
            - Earth is sunk under
            - Water is sunk under
            - fools Landing is sunk under


        //Player Turn
        - 3 Actions
        - Draw Action Cards
        - Draw Flood Cards

*/

//This file will serve as the main entry point for the game

import { floodSix, game_board, game_details, game_status, placeTilesOnBoard } from '/src/js/game-logic/board.js';
import { StartGameModal } from '/src/js/ui/modal.js';
import { createBoardUI, redrawBoardUI } from '/src/js/ui/ui.js';
import { ACTION_CARDS, FLOOD_CARDS } from '/src/js/game-logic/tile.js';
import { shuffle, dividedShuffle } from '/src/js/game-machanics/shuffling.js';
import { PLAYER_CARDS } from '/src/js/game-logic/player.js';

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


function setDifficulty(playerDifficuly) {
    return new Promise(resolve => {
        console.log('setDifficulty')
        game_details.current_flood_level = playerDifficuly;
        resolve();
    });
}

function shuffleActionCards(ACTION_CARDS) {
    return new Promise(resolve => {
        console.log('shuffle action')
        shuffle(ACTION_CARDS);
        game_details.action_deck.unused = ACTION_CARDS;
        resolve();
    });
}

function shuffleFloodCards(FLOOD_CARDS) {
    return new Promise(resolve => {
        console.log('shuffle flood')
        shuffle(FLOOD_CARDS);
        resolve();
    });
}

function shufflePlayerCards(PLAYER_CARDS) {
    return new Promise(resolve => {
        console.log('shuffle player')
        shuffle(PLAYER_CARDS);
        resolve();
    });
}

function placeTiles(game_board, FLOOD_CARDS) {
    return new Promise(resolve => {
        console.log('placeTiles')
        let duplicateFloodDeck = FLOOD_CARDS.slice();
        placeTilesOnBoard(game_board, duplicateFloodDeck);
        resolve();
    });
}

function initializeBoardUI(game_board) {
    return new Promise(resolve => {
        console.log('initializeBoardUI')
        createBoardUI(game_board);
        resolve();
    });
}

function game_setup(game_board, FLOOD_CARDS, ACTION_CARDS, PLAYER_CARDS, playerDifficuly) {
    addToQueue(setDifficulty, playerDifficuly);
    addToQueue(shuffleActionCards, ACTION_CARDS);
    addToQueue(shuffleFloodCards, FLOOD_CARDS);
    addToQueue(shufflePlayerCards, PLAYER_CARDS);
    addToQueue(placeTiles, game_board, FLOOD_CARDS);
    addToQueue(initializeBoardUI, game_board);
}


// Game runner function
function game_runner() {
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
        console.log(game_details);

      

        // Main game loop
        while (game_details.status !== game_status.lost || game_details.status !== game_status.won  ) { 
            // Game logic goes here

            if(game_details.status === game_status.won ){
                resolve(game_status.won);
            }
            if(game_details.status === game_status.lost ){
                resolve(game_status.lost);
            }

            // temp not to break the game
            game_details.status === game_status.lost
            resolve(game_status.won);
            return;
        }
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
