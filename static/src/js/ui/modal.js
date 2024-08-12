//Manages modals or popups that appear during the game, such as victory/defeat screens, instructions, or settings.

export let StartGameModal = $('#StartGame-Form').on('submit', (e) => {
    e.preventDefault()

    console.log('starting start game modal')
    let flood_level = $('#difficultySlider').val();
    let player_count = $('#numberOfPlayersSlider').val()
  
    $('#statingModal').addClass('d-none')
  
  
    // console.log('gameboard', game_board)
    // console.log('flood_level', flood_level)
    // console.log('player_count', player_count)
  })