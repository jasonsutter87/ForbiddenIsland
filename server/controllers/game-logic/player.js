//Manages player-related functionality, such as movement, interactions with tiles, and inventory management.
const { shuffle } = require('../game-machanics/shuffling');
const { game_details, PLAYER_CARDS } = require('../../models/models');






let setPlayerOnTheBoard = (gameDetails, player) => {

    //setting current player
   gameDetails.current_player = player

    // set player on board.
    gameDetails.players.forEach((val, int) => {
      let playerName = val.name
      gameDetails.gameBoard.forEach(row => row.forEach(cell => {
        if(cell !== "x") {
            if(cell.starting_position == playerName) {
                cell.current_players.push({id: val.id, name: val.name})
            }
        }
    }))
    
      let flattenBoard = gameDetails.gameBoard.flat();
      // -- use FLOOD_CARDS to get the tile that matchs players name 
      let result = flattenBoard.find(item => item && item.starting_position === playerName);
    })
}


module.exports = {
  setPlayerOnTheBoard
};

