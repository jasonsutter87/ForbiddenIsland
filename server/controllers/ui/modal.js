//Manages modals or popups that appear during the game, such as victory/defeat screens, instructions, or settings.
const { game_details, game_status } = require('../../models/models'); // Relative path
const { GAME_STATUS } = require('../../Enums/enums');
const { setPlayerOnTheBoard } = require('../game-logic/player'); // Relative path
const { getAdjacentTileIds, findPlayerCoordinates } = require('../ui/ui'); // Relative path

let StartGameModal = () => {
  return new Promise((resolve) => {
    // console.log(('Ready to Start The Game')
    game_details.current_flood_level = 1;
    game_details.number_of_players = 4;
    setPlayerOnTheBoard(game_details.number_of_players)
    game_details.status = GAME_STATUS.inProgress;

    resolve(game_details);
  });
};

let playerMoveOrActionModal = (toId) => {
  return new Promise((resolve) => {
    
    let fromId = $(`.player-active-${game_details.current_player.name}`).attr('cardid')

    let currentPlayersLocation = findPlayerCoordinates(game_details.current_player.name)
    let adjacentTileIds = getAdjacentTileIds(game_details.gameBoard, currentPlayersLocation)
    let result = adjacentTileIds.find(x => x == toId)
    
    if(result) {  
      if(fromId != toId ) {
        movePlayer(fromId, toId)
      }
    }

    resolve();
  })
}




//refacfor.
/*
current bug, if you click fast enough, the wrong player will start moving,

solution: update
 if($(val).hasClass('player-piece')){
        $player = $(val);   
      }

      to include a check of the players Id 

*/
let movePlayer = (fromId, toId) => {
  return new Promise((resolve) => {
    var $clickedtitle = $(`.player-active-${game_details.current_player.name}`).children()
    var $player; 

    $clickedtitle.each((ind, val) => {
      if($(val).hasClass('player-piece')){
        $player = $(val);   
      }
    });

    var $fromCell = $(`.tile[cardid="${fromId}"]`);
    var $toCell = $(`.tile[cardid="${toId}"]`);

    if(fromId === toId){
      resolve();
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

    resolve();
    }

  })
}


module.exports = {
  StartGameModal,
  playerMoveOrActionModal,
  movePlayer
}