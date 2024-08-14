//Manages modals or popups that appear during the game, such as victory/defeat screens, instructions, or settings.
import { game_details } from "../game-logic/board.js";


export let StartGameModal = $('#StartGame-Form').on('submit', (e) => {
    e.preventDefault()
    game_details.current_flood_level = parseInt($('#difficultySlider').val())
    game_details.number_of_players = parseInt($('#numberOfPlayersSlider').val())

  
    $('#statingModal').addClass('d-none')

    return game_details;
})


export let PlayerFloodTileAction = $('')