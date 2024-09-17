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



    
})



