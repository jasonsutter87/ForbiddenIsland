// //This file will serve as the main entry point for your game, where you initialize the game board, set up players, and start the game loop.

// // Difficultys
// DIFFICULTY;
// // Treasures
// TREASURES;
// // action Cards
// ACTION_CARDS;
// // Player Cards
// PLAYER_CARDS;
// // Flood Cards
// FLOOD_CARDS;
// // Set intial flood level
// let flood_level = 0;
// let flood_draw_count = 2;
// //starting game board temp starting position
// game_board;
// let player_count = 1;
// let flood_discard = [];
// ////Set up functions




// //////////////////
// //  Game Start  //
// //////////////////

// //shuffle flood Cards
// shuffle(FLOOD_CARDS);
// //shuffle action Cards
// shuffle(ACTION_CARDS);
// //shuffle player Cards
// shuffle(PLAYER_CARDS);

// let shuffled_actions_cards = ACTION_CARDS;
// let shuffled_player_cards = PLAYER_CARDS;
// let shuffled_flood_cards = FLOOD_CARDS.slice();
// let starting_flood_cards = shuffled_flood_cards.slice();


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
import { StartGameModal } from '/src/js/ui/modal.js';

let game_runner = () =>  {
    game_setup();

    StartGameModal;

    let game_lost = false;
    let game_won = false;

    // // Main game loop
    // while (!game_lost && !game_won) { 
    //     // Game logic goes here

    //     if(game_won){
    //         return true;
    //     }
    //     if(game_lost){
    //         return false;
    //     }




    // }
    

}


let game_setup = () => {
    console.log('gmae runner: game_setup')
    //
}

    
//runner
game_runner()