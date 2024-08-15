// Handles the setup of the game board, including placing tiles, managing the board state, and updating the board as the game progresses.
import { selectObjectById } from "../utilities/utils.js";
import { moveCardNewPile } from "../game-machanics/cards.js"
import { shuffle } from "../game-machanics/shuffling.js";

export let game_board = [
    ['x', 'x', 'c', 'c', 'x', 'x'],
    ['x', 'c', 'c', 'c', 'c', 'x'],
    ['c', 'c', 'c', 'c', 'c', 'c'],
    ['c', 'c', 'c', 'c', 'c', 'c'],
    ['x', 'c', 'c', 'c', 'c', 'x'],
    ['x', 'x', 'c', 'c', 'x', 'x'],
]

export let raiseTheWaterLevel = () => { 
    flood_level++
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
} 
  
export let floodByWaterLevel = (floodDeck, waterLevel) => {
    for (let i = 0; i < waterLevel; i++) {
      if (floodDeck.length > 0) {
        let val = floodDeck.shift();
        let tile = selectObjectById(game_board, val.id);
        if (tile) {
          tile.flooded = true;
          moveCardNewPile(flood_discard, [val]);
        }
      }
    }
};


export let placeTilesOnBoard = (gameBoard, floodDeck) => {
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      if (gameBoard[i][j] === 'c') {
        gameBoard[i][j] = floodDeck.shift();
      }
    }
  }
}

export let floodSix = (game_board) => {
  shuffle(game_board)

  game_details.flood_deck.unused = game_board
  game_details.flood_deck.unused.forEach((val, ind) => {
      if(ind < 6) {
      let tile = selectObjectById(game_details.gameBoard, val.id)
      tile.flooded = true 
      moveCardNewPile(game_details.flood_deck.discard,  game_details.flood_deck.unused );
      }
  });
};

export let game_status = {
  notStarted: 'Not Started',
  inProgress: 'In Progress',
  lost: 'Lost',
  won: 'Won'
}

export let game_details = {
  flood_deck: {
    discard: [],
    unused: [],
  },
  action_deck: {
    discard: [],
    unused: [],
  },
  number_of_players: null,
  current_player: null,
  current_player_turns_left: null,
  gameBoard: game_board,
  status: game_status.notStarted,
  current_flood_level: 0
}


