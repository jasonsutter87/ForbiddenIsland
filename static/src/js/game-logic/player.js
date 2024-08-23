//Manages player-related functionality, such as movement, interactions with tiles, and inventory management.
import { shuffle } from '../game-machanics/shuffling.js';
import { game_details } from '/src/js/game-logic/board.js';

export const PLAYER_CARDS = [
    {
      id: 1,
      name: "Diver",
      color: "Black",
      actionCards: [],
      Action: "Move through flooded or sunk areas as 1 turn, must land on land."
    },
    {
      id: 2,
      name: "Pilot",
      color: "Blue",
      actionCards: [],
      Action: "Once per turn, fly to any tile on the island for 1 action."
    },
    {
      id: 3,
      name: "Messenger",
      color: "Silver",
      actionCards: [],
      Action: "Give Treasure cards to a player anyer on the island for 1 action."
    },
    {
      id: 4,
      name: "Explorer",
      color: "Green",
      actionCards: [],
      Action: "Move and/or shore up diagonally."
    },
    {
      id: 5,
      name: "Engineer",
      color: "Red",
      actionCards: [],
      Action: "Shore up 2 tiles for 1 action."
    },
  
    {
      id: 6,
      name: "Navigator",
      color: "Yellow",
      actionCards: [],
      Action: "Move another player up to 2 adjacent tiles for 1 action."
    }
  ]

export const DIFFICULTY = {
  novice: 1,
  normal: 2,
  elite: 3,
  legendary: 4
}

export function setDifficulty(playerDifficuly) {
  return new Promise(resolve => {
      console.log('setDifficulty')
      game_details.current_flood_level = playerDifficuly;
      resolve();
  });
}

export let setPlayerOnTheBoard = (playerCount) => {
  //set player on the backend
    shuffle(PLAYER_CARDS)

    shuffle(PLAYER_CARDS)
    for(var i = 0; i < playerCount; i++) {
      game_details.players.push(PLAYER_CARDS[i])
    }

    game_details.current_player = game_details.players[0].name
    
    
    // set player on board.
    game_details.players.forEach((val, int) => {
      let playerName = val.name
      
      let flattenBoard = game_details.gameBoard.flat();
      // -- use FLOOD_CARDS to get the tile that matchs players name 
      let result = flattenBoard.find(item => item && item.starting_position === playerName);

      $(() =>  {    
    
        if(result.starting_position == game_details.current_player) {
          $(`.tile[cardid="${result.id}"]`).addClass(`player-active-${game_details.current_player}`)
        }
        
        // use the players starting tile ID, place player on the tile that matchs
        $(`.tile[cardid="${result.id}"]`).append(`
          <img src="/assets/images/players/${playerName}.png" class="player-piece" player='${playerName}' >
        `)
      })

    })


 
}


