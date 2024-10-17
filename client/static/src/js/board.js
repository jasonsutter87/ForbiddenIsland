import { socket } from './sockets.js'

let movePlayer = (game_details, fromId, toId) => {
  var $clickedtitle = $('[class*="player-active-"]').children()
  var $player;

///👾 Bug: i dont think the player is correct
// set same type on fromId< - string?, toId <- is a number

  $clickedtitle.each((ind, val) => {
    if ($(val).hasClass('player-piece')) {
      $player = $(val);
      console.log('movePlayer - client - player', $player)
      socket.emit('movePlayer', $player, fromId, toId)
    }
  });

  var $fromCell = $(`.tile[cardid="${fromId}"]`);
  var $toCell = $(`.tile[cardid="${toId}"]`);

  if (fromId === toId) {
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
    }, 500, function () {
      // After animation completes, move the real player and remove the clone
      $clone.remove();
      $player.appendTo($toCell);
    });

  }

}

export { movePlayer };
