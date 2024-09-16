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
        }, 2000)
    })



    $('#sendGameRoomMessage').on('click', e => {
        e.preventDefault();

        console.log('in sendGameRoomMessage')

        let message = $('#gameRoomMessageInput').val(); 
        socket.emit('gameMessage', message)
        console.log(message)
    })
})



