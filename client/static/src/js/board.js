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


let floodSix = (room) => {
    room.gameDetails.flood_deck.unused.forEach((val, ind) => {
        if(ind < 6) {
        let tile = selectObjectById(room.gameDetails.gameBoard, val.id)
        tile.flooded = true 
        moveCardNewPile(room.gameDetails.flood_deck.discard,  room.gameDetails.flood_deck.unused );
        }
    });
};


let setUpFloodCards = (data) => {
  console.log('setUpFloodCards', data)
}


let refreshFloodCards = () => {}

export { floodSix, setUpFloodCards };
