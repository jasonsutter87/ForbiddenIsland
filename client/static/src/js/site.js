// 1. Connect to Socket.io server
const serverUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://forbidden-island.netlify.app/';

// Connect to the Socket.io server
const socket = io(serverUrl);


// 2. Listen for 'move' events from the server
socket.on('move', (data) => {
    console.log('Move received:', data);
    // Handle move received from other players
    alert(`Other player moved: ${JSON.stringify(data)}`);
});

// 3. Make a move when the button is clicked
document.getElementById('makeMove').addEventListener('click', () => {
    const moveData = { playerId: socket.id, action: 'moved' }; // Example data
    console.log('Move made:', moveData);

    // Emit the move event to the server
    socket.emit('move', moveData);
});

// 4. Fetch game state from REST API
fetch('http://localhost:3000/api/game/state')
    .then(response => response.json())
    .then(data => {
        document.getElementById('gameState').innerText = `Game state: ${JSON.stringify(data)}`;
    })
    .catch(error => console.error('Error fetching game state:', error));

// 5. Handle connection and disconnection events
socket.on('connect', () => {
    console.log('Connected to server with ID:', socket.id);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});