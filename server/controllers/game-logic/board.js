// server/controllers/game-logic.js

const { selectObjectById } = require("../utils/helpers");
const { moveCardNewPile } = require("../game-mechanics/cards");
const { shuffle } = require("../game-mechanics/shuffling");
const { TREASURES } = require("./tile");

// Game board setup
let game_board = [
    ['x', 'x', 'c', 'c', 'x', 'x'],
    ['x', 'c', 'c', 'c', 'c', 'x'],
    ['c', 'c', 'c', 'c', 'c', 'c'],
    ['c', 'c', 'c', 'c', 'c', 'c'],
    ['x', 'c', 'c', 'c', 'c', 'x'],
    ['x', 'x', 'c', 'c', 'x', 'x'],
];

let flood_level = 0;
let flood_draw_count = 2;

// Utility function to emit game state to all connected clients
const emitGameState = (io) => {
    io.emit('gameStateUpdate', {
        gameBoard: game_details.gameBoard,
        floodLevel: game_details.current_flood_level,
        players: game_details.players,
        status: game_details.status
    });
};

// Handle raising the water level
let raiseTheWaterLevel = (io) => { 
    flood_level++;
    switch (true) {
        case (flood_level >= 8):
            flood_draw_count = 5;
            break;
        case (flood_level >= 6):
            flood_draw_count = 4;
            break;
        case (flood_level >= 3):
            flood_draw_count = 3;
            break;
        default:
            flood_draw_count = 2; // Base case
    }
    // Broadcast water level update
    emitGameState(io);
};

// Flood by water level logic
let floodByWaterLevel = (floodDeck, waterLevel, io) => {
    for (let i = 0; i < waterLevel; i++) {
        if (floodDeck.length > 0) {
            let val = floodDeck.shift();
            let tile = selectObjectById(game_board, val.id);
            if (tile) {
                tile.flooded = true;
                moveCardNewPile(game_details.flood_deck.discard, [val]);
            }
        }
    }
    // Broadcast the game state after flooding
    emitGameState(io);
};

// Place tiles on the board at the start of the game
let placeTilesOnBoard = (gameBoard, FLOOD_CARDS, io) => {
    return new Promise((resolve) => {
        let duplicateFloodDeck = FLOOD_CARDS.slice();

        for (let i = 0; i < gameBoard.length; i++) {
            for (let j = 0; j < gameBoard[i].length; j++) {
                if (gameBoard[i][j] === 'c') {
                    gameBoard[i][j] = duplicateFloodDeck.shift();
                }
            }
        }
        resolve();
        // Broadcast the initial game state after placing tiles
        emitGameState(io);
    });
};

// Flood six tiles at the start of the game
let floodSix = (game_board, io) => {
    shuffle(game_board);
    game_details.flood_deck.unused = game_board;
    game_details.flood_deck.unused.forEach((val, ind) => {
        if (ind < 6) {
            let tile = selectObjectById(game_details.gameBoard, val.id);
            tile.flooded = true;
            moveCardNewPile(game_details.flood_deck.discard, game_details.flood_deck.unused);
        }
    });
    // Broadcast game state after flooding six tiles
    emitGameState(io);
};

// Check if treasure has sunk
function checkTreasureSunk(board, treasure) {
    const tiles = board.flat().filter(tile => typeof tile === 'object');
    const matchingTiles = tiles.filter(tile => tile.treasure === treasure);
    if (matchingTiles.length === 0) return true;
    return !matchingTiles.every(tile => tile.sunk === false);
}

// Check if the player has lost
let checkForPlayerLost = (cardId, count, io) => {
    return new Promise(resolve => {
        console.log('checking if Player Lost Attempt:' + count);

        if (game_details.current_flood_level >= 10 || 
            checkTreasureSunk(game_details.gameBoard, TREASURES.wind_treasure) || 
            checkTreasureSunk(game_details.gameBoard, TREASURES.fire_treasure) ||
            checkTreasureSunk(game_details.gameBoard, TREASURES.water_treasure) ||
            checkTreasureSunk(game_details.gameBoard, TREASURES.earth_treasure)) {
            game_details.status = game_status.lost;
            emitGameState(io); // Broadcast the game lost state
            resolve(true);
        } else {
            let fools_landing = selectObjectById(game_details.gameBoard, cardId);
            if (fools_landing.sunk) {
                game_details.status = game_status.lost;
                emitGameState(io);
                resolve(true);
            }
        }
        resolve(false);
    });
};

// Game details and status
let game_status = {
    notStarted: 'Not Started',
    inProgress: 'In Progress',
    lost: 'Lost',
    won: 'Won'
};

let game_details = {
    flood_deck: {
        discard: [],
        unused: [],
        removed: []
    },
    action_deck: {
        discard: [],
        unused: []
    },
    players: [],
    number_of_players: null,
    current_player: null,
    current_player_turns_left: null,
    gameBoard: game_board,
    status: game_status.notStarted,
    current_flood_level: 0
};

// Exported functions to be used in routes and sockets
module.exports = {
    game_details,
    raiseTheWaterLevel,
    floodByWaterLevel,
    placeTilesOnBoard,
    floodSix,
    checkForPlayerLost,
    game_status
};
