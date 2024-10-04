let gameQueue = [];
let isProcessing = false;
    
// Queue management functions
function addToQueue(fn, ...args) {
    gameQueue.push(() => fn(...args));
    processQueue();
}

async function processQueue() {
    if (isProcessing || gameQueue.length === 0) return;

    isProcessing = true;
    const fn = gameQueue.shift();

    await fn();  // Wait for the function to finish

    isProcessing = false;
    processQueue();  // Process the next function
}

let socket;

function initialize(sock) {
    socket = sock; // Store the socket instance
}



// let gameloop = () => {
//     return new Promise( (resolve) => {
//         let count = 0 ;

//         while (game_details.status !== game_status.lost || game_details.status !== game_status.won  ) { 
//             // breakpoints to stop game loops
//             if(game_details.status === game_status.won ){
//                 resolve(game_status.won);
//             }
//             if(game_details.status === game_status.lost ){
//                 resolve(game_status.lost);
//             }

//             //check if player lost
//             addToQueue(checkForPlayerLost, 5, count);

//             // check if player won 
//             addToQueue(checkForPlayerWon);

//             //player Action or Move
//             addToQueue(playerMoveOrActionModal);



//             //Todo  
//             if(count >= 2) {
                
//                 // temp not to break the game
//                 game_details.status === game_status.lost
//                 resolve(game_status.won);
//                 return
//             } else {
//                 count++
//             }
//         }


//         resolve(game_status)
//     })
// }

// // Game runner function

let game_runner = () => {
    return new Promise(async (resolve) => {
        // console.log(('new game');
        // // Game Set up
        // StartGameModal()


        // //////////////////
        // //  Game Start  //
        // //////////////////

        // // Flood six cards
        // addToQueue(floodBoard, FLOOD_CARDS);

        // // Redraw UI
        // addToQueue(redrawBoardUI, game_board);

  
        // // Log game details
        // addToQueue(showDetails)
       


        // // // Main game loop
        // addToQueue(gameloop)
    });
}


module.exports = {
    initialize,
    game_runner,
}