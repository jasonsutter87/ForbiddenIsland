//Manages player-related functionality, such as movement, interactions with tiles, and inventory management.
const { shuffle } = require('../game-machanics/shuffling');
const { game_details, PLAYER_CARDS } = require('../../models/models');


let setCurrentPlayer = (player) => {
  return new Promise((resolve) => { 
    game_details.current_player = player
    resolve()
  })
}

let setPlayerOnTheBoard = (playerCount) => {
  //set player on the backend
    shuffle(PLAYER_CARDS)
    shuffle(PLAYER_CARDS)

    for(var i = 0; i < playerCount; i++) {
      game_details.players.push(PLAYER_CARDS[i])
    }

    //setting current player
    setCurrentPlayer(game_details.players[0])

    // set player on board.
    game_details.players.forEach((val, int) => {
      let playerName = val.name
      game_details.gameBoard.forEach(row => row.forEach(cell => {
        if(cell !== "x") {
            if(cell.starting_position == playerName) {
                cell.current_players.push({id: val.id, name: val.name})
            }
        }
    }))
    

      let flattenBoard = game_details.gameBoard.flat();
      // -- use FLOOD_CARDS to get the tile that matchs players name 
      let result = flattenBoard.find(item => item && item.starting_position === playerName);


    })
}


module.exports = {
  setCurrentPlayer,
  setPlayerOnTheBoard
};

