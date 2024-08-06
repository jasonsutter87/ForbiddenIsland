import {
  DIFFICULTY,
  TREASURES,
  ACTION_CARDS,
  PLAYER_CARDS,
  FLOOD_CARDS,
  game_board
} from './lookups.js';


/*TODO:

///Setting up Gameplay
 - Set up the island - front end
 - Set up the players - front end modal?
  - pick how many players 2- 4
  - deal player cards
  - place players on the island
 - Set up the flood deck
    - draw 6 flood cards and flood the island

//Set Up Players Movement
    - Current Player
    - Current Location
    - IsDrowning
    - Move
    - Shore Up
    - Give Card
    - Capture Treasure
    - Helicopter Lift
    - Sandbag
    - Water Rises
    - Discard
    - Draw Treasure Cards
    - Draw Flood Cards
    - End Turn
    - Win Condition
    - Lose Condition
    - Players Hand




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

// Difficultys
DIFFICULTY;
// Treasures
TREASURES;
// action Cards
ACTION_CARDS;
// Player Cards
PLAYER_CARDS;
// Flood Cards
FLOOD_CARDS;
// Set intial flood level
let flood_level = 0;
//starting game board temp starting position
game_board;
////Set up functions

//normal Shuffle
let shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
//Divided Shuffle
let dividedShuffle = (topCards, bottomCards) => {
  shuffle(topCards)
  return topCards + ',' + bottomCards
}

//set Difficulty Level
let setDifficulty = difficulty => {
  flood_level = difficulty
}

//placeTilesOnBoard
let placeTilesOnBoard = (gameBoard, floodDeck) => {
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      if (gameBoard[i][j] === 'c') {
        gameBoard[i][j] = floodDeck.shift();
      }
    }
  }
}


//////////////////
//  Game Start  //
//////////////////

//shuffle flood Cards
shuffle(FLOOD_CARDS);
//shuffle action Cards
shuffle(ACTION_CARDS);
//shuffle player Cards
shuffle(PLAYER_CARDS);

let shuffled_actions_cards = ACTION_CARDS;
let shuffled_player_cards = PLAYER_CARDS;
let shuffled_flood_cards = FLOOD_CARDS.slice();
let starting_flood_cards = shuffled_flood_cards.slice();

setDifficulty(DIFFICULTY.novice)
placeTilesOnBoard(game_board, shuffled_flood_cards)



//gameboard
// console.log('gameboard', game_board)
// console.log('starting_flood_cards', starting_flood_cards)
console.log('shuffled_actions_cards', shuffled_actions_cards)
// console.log('shuffled_player_cards', shuffled_player_cards)

//End New Game Runner Start
