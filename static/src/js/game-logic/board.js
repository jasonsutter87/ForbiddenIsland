// Handles the setup of the game board, including placing tiles, managing the board state, and updating the board as the game progresses.

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
    }``
    console.log('gameboard', game_board)
};

export let floodSix = (gameBoard) => {
  gameBoard.forEach((val, ind) => {
      if(ind < 6) {
      let tile = selectObjectById(game_board, val.id)
      tile.flooded = true 
      console.log(val)
      moveCardNewPile(flood_discard, gameBoard);
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
  status: game_status.notStarted
}


