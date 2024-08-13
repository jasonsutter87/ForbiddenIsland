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
import { floodSix, game_board, game_details } from '/src/js/game-logic/board.js';
import { StartGameModal } from '/src/js/ui/modal.js';
import { createBoardUI } from '/src/js/ui/ui.js'
import { ACTION_CARDS , FLOOD_CARDS } from '/src/js/game-logic/tile.js';
import { shuffle , dividedShuffle } from '/src/js/game-machanics/shuffling.js';

let game_runner = () =>  {
    //Game Set up
    let StartGameModalResults = StartGameModal;
    game_setup(game_board, shuffle(ACTION_CARDS), StartGameModalResults.playerDifficuly);
    //////////////////
    //  Game Start  //
    //////////////////

    floodSix()
    placePlayersOnBoard
    

    let game_lost = false;
    let game_won = false;

    // // Main game loop
    while (!game_lost || !game_won) { 
        // Game logic goes here

        if(game_won){
            return true;
        }
        if(game_lost){
            return false;
        }




        //temp not to break the game, 
        game_lost = true;
        return game_lost;
    }
    

}


let game_setup = (cardDeck, actionCard, playerDifficuly) => {
    console.log('game runner: game_setup')
    
    //set difficuulty via that flood level 
    game_details.current_flood_level = playerDifficuly
    // shuffle action cards

    //shuffle floodDeck
    
    //duplicate new flood deck for Flood Cards

    // call the ui to set the deck with the shufflec deck
    createBoardUI(cardDeck)
}

    
//runner
game_runner()