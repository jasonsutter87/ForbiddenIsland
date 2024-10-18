import { socket } from './sockets.js'

let movePlayer = (roomName, fromId, toId) => {
  var $player = $('[class*="player-active-"]').find('.player-piece');
  var $playerName = $('[class*="player-active-"]').find('.player-piece').attr('player');

  var $fromCell = $(`.tile[cardid="${fromId}"]`);
  var $toCell = $(`.tile[cardid="${toId}"]`);

  if (fromId === toId) {
    return false;
  } else {
    var $clone = $player.clone().appendTo($('body'));

    $clone.css({
      top: $player.offset().top,
      left: $player.offset().left,
      zIndex: 1000
    });

    var targetOffset = $toCell.offset();

    $($fromCell).removeClass(`player-active-${$playerName}`);
    $($toCell).addClass(`player-active-${$playerName}`);
   
    $clone.animate({
      top: targetOffset.top,
      left: targetOffset.left
    }, 500, function () {
      $player.appendTo($toCell);
      $clone.remove();
    });


    socket.emit('movePlayer', $playerName, roomName,fromId, toId);
  }
};

export { movePlayer };
