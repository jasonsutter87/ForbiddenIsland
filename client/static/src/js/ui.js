import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

$(() => {


    console.log('ready')

    // 1. Connect to Socket.io server
const serverUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://forbiddenisland.onrender.com';

// Connect to the Socket.io server
const socket = io(serverUrl);


// const socket = io('http://localhost:3000');


    $('#btn-play-game').on('click', e => {
        e.preventDefault();
        console.log('clicking play gmae')
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
            console.log(message)
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
            console.log(message)
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
       $('#inputNameModal').remove();
    })



    
})



