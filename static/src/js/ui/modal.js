//Manages modals or popups that appear during the game, such as victory/defeat screens, instructions, or settings.
import { game_details } from "../game-logic/board.js";
import { setPlayerOnTheBoard } from '/src/js/game-logic/player.js';

export let StartGameModal = () => {
  return new Promise((resolve) => {
      $('#StartGame-Form').on('submit', (e) => {
          e.preventDefault();
          console.log('StartGameModal')
          // Set game details based on form input
          game_details.current_flood_level = parseInt($('#difficultySlider').val());
          game_details.number_of_players = parseInt($('#numberOfPlayersSlider').val());

          setPlayerOnTheBoard(game_details.number_of_players)

          // Hide the modal
          $('#statingModal').addClass('d-none');

          // Resolve the promise with game details
          resolve(game_details);
      });
  });
};

export let playerMoveOrActionModal = (toId) => {
  return new Promise((resolve) => {
    let fromId = $(`.player-active-${game_details.current_player}`).attr('cardid')

    if(fromId != toId ) {
      movePlayer(fromId, toId)
    }
    resolve();
  })
}


export let movePlayer = (fromId, toId) => {
  return new Promise((resolve) => {
    var $clickedtitle = $(`.player-active-${game_details.current_player}`).children()
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


    $($fromCell).removeClass(`player-active-${game_details.current_player}`)
    $($toCell).addClass(`player-active-${game_details.current_player}`)


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