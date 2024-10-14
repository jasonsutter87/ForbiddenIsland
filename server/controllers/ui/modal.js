// //Manages modals or popups that appear during the game, such as victory/defeat screens, instructions, or settings.
// const { game_details, game_status } = require('../../models/models'); // Relative path
// const { GAME_STATUS } = require('../../Enums/enums');
// const { setPlayerOnTheBoard } = require('../game-logic/player'); // Relative path
// const { getAdjacentTileIds, findPlayerCoordinates } = require('../ui/ui'); // Relative path

// let StartGameModal = () => {
//   return new Promise((resolve) => {
//     game_details.current_flood_level = 1;
//     game_details.number_of_players = 4;
//     setPlayerOnTheBoard(game_details.number_of_players)
//     game_details.status = GAME_STATUS.inProgress;

//     resolve(game_details);
//   });
// };



// module.exports = {
//   StartGameModal,
//   playerMoveOrActionModal,
//   movePlayer
// }