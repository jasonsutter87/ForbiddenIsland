const addPlayerToTile = (cell, player) => {
  if (!cell.current_players.some(p => p.id === player.id)) {
      cell.current_players.push(player);
  } 
};

let setPlayerOnTheBoard = (gameDetails, player) => {
  gameDetails.current_player = player;

  gameDetails.players.forEach((val) => {
      let playerName = val.name;
      gameDetails.gameBoard.forEach(row => row.forEach(cell => {
          if (cell !== "x" && cell.starting_position === playerName) {
              addPlayerToTile(cell, {id: val.id, name: val.name});
          }
      }));
  });
};

module.exports = {
  setPlayerOnTheBoard
};

