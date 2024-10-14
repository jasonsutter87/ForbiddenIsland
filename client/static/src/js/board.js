
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






//refacfor.
/*
current bug, if you click fast enough, the wrong player will start moving,

solution: update
 if($(val).hasClass('player-piece')){
        $player = $(val);   
      }

      to include a check of the players Id 

*/
let movePlayer = (game_details, fromId, toId) => {
    var $clickedtitle = $('[class*="player-active-"]').children()
    var $player; 

    $clickedtitle.each((ind, val) => {
      if($(val).hasClass('player-piece')){
        $player = $(val);   
      }
    });

    var $fromCell = $(`.tile[cardid="${fromId}"]`);
    var $toCell = $(`.tile[cardid="${toId}"]`);

    if(fromId === toId){
      return false
    } else {

    // Clone player
    var $clone = $player.clone().appendTo($('body'));


    $clone.css({
        top: $player.offset().top,
        left: $player.offset().left,
        zIndex: 1000
    });

    // Calculate target position
    var targetOffset = $toCell.offset();



    //refactor
    $($fromCell).removeClass(`player-active-${game_details.current_player.name}`)
    $($toCell).addClass(`player-active-${game_details.current_player.name}`)


    // Animate the clone to the new position
    $clone.animate({
        top: targetOffset.top,
        left: targetOffset.left
    }, 500, function() {
        // After animation completes, move the real player and remove the clone
        $clone.remove();
        $player.appendTo($toCell);
    });

 
    }

}






export {  moveCardNewPile, movePlayer };
