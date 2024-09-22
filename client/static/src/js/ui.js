import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import { socket } from './sockets.js'

$(() => {
    $('#btn-play-game').on('click', e => {
        e.preventDefault();
        socket.emit('joinRoom')
        $('#startingModal').removeClass('active')

        setTimeout(()=>{
            $('.startingModal-wrapper').remove()
            $('.joinRoomModal-wrapper').removeClass('d-none')
        }, 1000)
        
    })

    $('#gameRoomMessageForm').on('submit', e => {
        e.preventDefault();
        let message = $('#gameRoomMessageInput').val(); 

        if(message.length >= 1) {
            socket.emit('gameMessage', message)
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
            socket.emit('gameMessage', message)
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

        socket.emit('incomingPlayer', socket.name)
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

        socket.emit('incomingPlayer', socket.name)
  
       $('#inputNameModal').remove();
    })

    $('#areYouReady').on('change', e => {
        e.preventDefault();
        if(e.target.value == 'yes') {
            // console.log((socket.roomName)
            socket.emit('increaseReadyPlayers', socket.roomName) 
            $('#areYouReady').attr('disabled', true)
        }
    })
})



