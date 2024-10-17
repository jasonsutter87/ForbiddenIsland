import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import { socket } from './sockets.js'


$(() => {
    //master
    // let socketURL = 'https://forbiddenisland.onrender.com';
// 
    
    //dev
    let socketURL = 'http://localhost:3000';

    $('#btn-play-game').on('click', e => {
        e.preventDefault();
        socket.emit('joinRoom')
        $('#startingModal').removeClass('active')
        appendLayoutsToRoomSelect()

        setTimeout(()=>{
            $('.startingModal-wrapper').remove()
            $('.joinRoomModal-wrapper').removeClass('d-none')
        }, 1000)
        
    })

    $('#gameRoomMessageForm').on('submit', e => {
        e.preventDefault();
        let message = $('#gameRoomMessageInput').val(); 

        if(message.length >= 1) {
            socket.emit('gameMessage', message, socket.id)
            $('#gameRoomMessageInput').val('');
        } else {
            $('.error').addClass('active')
            setTimeout(() => {
                $('.error').removeClass('active')
            }, 3000)
        }
    })

    $('#sendGameRoomMessage').on('click', e => {
        e.preventDefault();
        let message = $('#gameRoomMessageInput').val(); 

        if(message.length >= 1) {
            socket.emit('gameMessage', message, socket.id)
            $('#gameRoomMessageInput').val('');
        } else {
            $('.error').addClass('active')
            setTimeout(() => {
                $('.error').removeClass('active')
            }, 3000)
        }
    })

    $('#exitInputNameModal').on('click', e => {
        e.preventDefault();   
        const inputVal = $(e.target).find('input').val(); // Find the input element and get its value
   
        if(!inputVal) {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const initial = lastName.charAt(0); 

            let fullNameWithInitial = faker.internet.displayName({ firstName: firstName, lastName: lastName })
            socket.name = fullNameWithInitial
        } else {
            socket.name = inputVal 
        }
        
        $('.ChatContentArea-wrapper').prepend(`
            <div class="userName">
                <span>Username: </span>
                <span class="name">${socket.name}</span>
            </div>
        `)

        $('.ChatContentArea-wrapper').prepend(`
        <div class="toast success">
            <p class="mb-0"><span id="incomingUser" class="bold">${socket.name}</span> <span>has entered the room</span></p>
        </div>
        `)

        setTimeout(() => {
            $('.toast').remove();
        }, 3000)

        socket.emit('incomingPlayer', socket.name, socket.id)
       $('#inputNameModal').remove();
    })

    $('#inputNameModuleForm').on('submit', e => {
        e.preventDefault();   
        const inputVal = $(e.target).find('input').val(); // Find the input element and get its value
   
        if(!inputVal) {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const initial = lastName.charAt(0); 

            let fullNameWithInitial = faker.internet.displayName({ firstName: firstName, lastName: lastName })
            socket.name = fullNameWithInitial
        } else {
            socket.name = inputVal 
        }

        $('.ChatContentArea-wrapper').prepend(`
            <div class="userName">
                <span>Username: </span>
                <span class="name">${socket.name}</span>
            </div>
        `)

        $('.ChatContentArea-wrapper').prepend(`
            <div class="toast success">
             <p class="mb-0"><span id="incomingUser" class="bold">${socket.name}</span> <span>has entered the room</span></p>
         </div>
        `)

        setTimeout(() => {
            $('.toast').remove();
        }, 3000)

        socket.emit('incomingPlayer', socket.name, socket.id)
  
       $('#inputNameModal').remove();
    })

    $('#areYouReady').on('change', e => {
        e.preventDefault();
        if(e.target.value == 'yes') {
            socket.emit('increaseReadyPlayers', socket.roomName) 
            $('#areYouReady').attr('disabled', true)
        }
    })

    $('#selectGameLayout').on('change', e => {
        e.preventDefault();
        let layoutId = e.target.value;
        socket.emit('changeGameLayoutType', socket.roomName, layoutId) 
    })

    $('#dealFloodCard').on('click', e => {
        e.preventDefault();

        let game_details;

        socket.emit('getRoomDetails', socket.roomName, (roomDetails) => {
          game_details = roomDetails.gameDetails;
          console.log('dealing flood cards', game_details)
        
     
            if(game_details.current_player_turn.flood_cards_deal >=  game_details.flood_deal_count) {
                socket.emit('rotatePlayers', socket.roomName) 
                alert('time to chnage players!!!!')
            }


          if((game_details.current_player_turn.number_of_actions >= 3 && game_details.current_player_turn.action_cards_deal >= 2) && game_details.current_player_turn.flood_cards_deal < game_details.flood_deal_count ) {
              socket.emit('dealFloodCard', socket.roomName) 
          }
        })

    })

    $('#dealActionCard').on('click', e => {
        e.preventDefault();

        let game_details;

        socket.emit('getRoomDetails', socket.roomName, (roomDetails) => {
          game_details = roomDetails.gameDetails;

          if(game_details.current_player_turn.number_of_actions >= 3 && game_details.current_player_turn.flood_cards_deal == 0) {
            if(game_details.current_player_turn.action_cards_deal < 2){

                console.log( game_details.current_player_turn)
                socket.emit('dealActionCard', socket.roomName) 
            } else {
                alert('FLip Flood Cards Now!')
            }
          } else if (game_details.current_player_turn.number_of_actions < 3 ) {
              alert('Do an action!')
          } 
        })  
    })

    let appendLayoutsToRoomSelect = () => { 
        $.ajax({
        url: socketURL + '/api/game/game-boards',  // The API endpoint for GAME_BOARD
        method: 'GET',
        dataType: 'json',  // Expecting JSON response
        success: function(data) {
            // Process the GAME_BOARD data here
            data.forEach(board => {
                if(board.id == 1) {
                    $('#selectGameLayout').append(`
                        <option value="${board.id}" selected>${board.name}</option>
                    `)
                } else {
                    $('#selectGameLayout').append(`
                        <option value="${board.id}">${board.name}</option>
                    `)
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching GAME_BOARD:', textStatus, errorThrown);
        }
        });

    }
})



