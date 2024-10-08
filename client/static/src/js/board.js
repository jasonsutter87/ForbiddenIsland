// Contains utility functions that can be reused across the project
let selectObjectById = (board, id) => {
    for (let row of board) {
        for (let tile of row) {
            if (typeof tile === 'object' && tile.id === id) {
                return tile;
            }
        }
    }
    return null;
  };


  let floodByWaterLevel = (floodDeck, waterLevel) => {
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
  

let moveCardNewPile = (inbound, outbound) => {
    if (outbound.length > 0) {
        inbound.push(outbound.shift());
    }
};


const findPlayerCoordinates = (playerName) => {
  // Get all rows in the board
  const rows = document.querySelectorAll('#board .row');

  // Loop through each row
  for (let row = 0; row < rows.length; row++) {
      // Get all tiles in the current row
      const tiles = rows[row].querySelectorAll('.tile');

      // Loop through each tile
      for (let col = 0; col < tiles.length; col++) {
          // Check if the tile contains the player's piece
          const playerPiece = tiles[col].querySelector(`.player-piece[player="${playerName}"]`);

          // If the player piece is found, return the coordinates
          if (playerPiece) {
              return { row: row, col: col };
          }
      }
  }

  // If the player is not found, return null
  return null;
}

let getAdjacentTileIds = (board, playerPosition) => {
  let directions;
  if(game_details.current_player.name == "Explorer"){
    directions = [
      { row: -1, col: 0 },  // Above
      { row: 1, col: 0 },   // Below
      { row: 0, col: -1 },  // Left
      { row: 0, col: 1 },   // Right
      { row: -1, col: -1 }, // Top-left diagonal
      { row: -1, col: 1 },  // Top-right diagonal
      { row: 1, col: -1 },  // Bottom-left diagonal
      { row: 1, col: 1 }    // Bottom-right diagonal
  
    ] ;
  } else {
    directions = [
       { row: -1, col: 0 },  // Above
       { row: 1, col: 0 },   // Below
       { row: 0, col: -1 },  // Left
       { row: 0, col: 1 },   // Right
   ];
  }

   return directions.map(direction => ({
      row: playerPosition.row + direction.row,
      col: playerPosition.col + direction.col
  }))
  .filter(tile =>
      // Ensure the tile is within the bounds of the board and not 'x'
      tile.row >= 0 && tile.row < board.length &&
      tile.col >= 0 && tile.col < board[0].length &&
      typeof board[tile.row][tile.col] === 'object'
  )
  .map(tile => board[tile.row][tile.col].id);
}





export {  moveCardNewPile };
