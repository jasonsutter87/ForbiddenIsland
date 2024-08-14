// //This file will serve as the main entry point for your game, where you initialize the game board, set up players, and start the game loop.

/*
//Runner
 - Set up
 - Set up Gameplay

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



//This file will serve as the main entry point for your game, where you initialize the game board, set up players, and start the game loop.

// runner
import { floodSix, game_board, game_details, placeTilesOnBoard } from '/src/js/game-logic/board.js';
import { StartGameModal } from '/src/js/ui/modal.js';
import { createBoardUI, redrawBoardUI } from '/src/js/ui/ui.js'
import { ACTION_CARDS , FLOOD_CARDS } from '/src/js/game-logic/tile.js';
import { shuffle , dividedShuffle } from '/src/js/game-machanics/shuffling.js';
import { PLAYER_CARDS } from '/src/js/game-logic/player.js'


// let game_runner = () =>  {
//     //Game Set up
//     let StartGameModalResults = StartGameModal;
//     game_setup(game_board, FLOOD_CARDS, ACTION_CARDS, PLAYER_CARDS,  StartGameModalResults.playerDifficuly);

//     //////////////////
//     //  Game Start  //
//     //////////////////

//     //flood six cards
//     floodSix(FLOOD_CARDS)
//     //redraw UI
//     redrawBoardUI(game_board)

//     // placePlayersOnBoard

//     console.log(game_details)

    

//     let game_lost = false;
//     let game_won = false;

//     // // Main game loop
//     while (!game_lost || !game_won) { 
//         // Game logic goes here

//         if(game_won){
//             return true;
//         }
//         if(game_lost){
//             return false;
//         }




//         //temp not to break the game, 
//         game_lost = true;
//         return game_lost;
//     }
    

// }


// let game_setup = (game_board, FLOOD_CARDS, ACTION_CARDS, PLAYER_CARDS, playerDifficuly) => {

//     //set difficulty via that flood level 
//     game_details.current_flood_level = playerDifficuly

//     // shuffle action cards
//     shuffle(ACTION_CARDS)

//     //setting action Cards
//     game_details.action_deck.unused = ACTION_CARDS

//     //shuffle floodDeck
//     shuffle(FLOOD_CARDS)

//     //shuffle Player Cards
//     shuffle(PLAYER_CARDS)

//     // //duplicate new flood deck for Flood Cards
//     let duplicateFloodDeck = FLOOD_CARDS.slice()

//     //place tiles on the board
//     placeTilesOnBoard(game_board, duplicateFloodDeck)

//     // call the ui to set the deck with the shufflec deck
//     createBoardUI(game_board)
// }

    
// //runner
// game_runner()

// Main game runner function
async function gameRunner() {
    try {
        // Game Set up
        let StartGameModalResults = StartGameModal; // Assuming StartGameModal is async
        await gameSetup(game_board, FLOOD_CARDS, ACTION_CARDS, PLAYER_CARDS, StartGameModalResults.playerDifficulty);

        //////////////////
        //  Game Start  //
        //////////////////

        // Flood six cards
        await floodSix(FLOOD_CARDS);

        // Redraw UI
        await redrawBoardUI(game_board);

        // Place players on board (if there's a function for this)
        // await placePlayersOnBoard(game_board);

        console.log(game_details);

        let game_lost = false;
        let game_won = false;

        // Main game loop
        while (!game_lost && !game_won) {
            // Game logic goes here
            
            // Placeholder: Implement actual game-winning and losing logic
            if (game_won) {
                return true;
            }
            if (game_lost) {
                return false;
            }

            // Temporary exit to prevent infinite loop during development
            game_lost = true;
        }

        return game_lost; // Return the game result

    } catch (error) {
        console.error("An error occurred during the game:", error);
    }
}

// Game setup function
async function gameSetup(game_board, FLOOD_CARDS, ACTION_CARDS, PLAYER_CARDS, playerDifficulty) {
    try {
        // Set difficulty via the flood level
        game_details.current_flood_level = playerDifficulty;

        // Shuffle decks
        shuffle(ACTION_CARDS);
        shuffle(FLOOD_CARDS);
        shuffle(PLAYER_CARDS);

        // Setting up the action deck
        game_details.action_deck.unused = ACTION_CARDS;

        // Duplicate and place tiles on the board
        let duplicateFloodDeck = FLOOD_CARDS.slice();
        await placeTilesOnBoard(game_board, duplicateFloodDeck);

        // Create the board UI with the shuffled deck
        await createBoardUI(game_board);

    } catch (error) {
        console.error("An error occurred during the game setup:", error);
    }
}

// Runner
gameRunner();
