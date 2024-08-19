//Manages player-related functionality, such as movement, interactions with tiles, and inventory management.
import { game_details } from '/src/js/game-logic/board.js';

export const PLAYER_CARDS = [
    {
      id: 1,
      name: "Diver",
      color: "Black",
      Action: "Move through flooded or sunk areas as 1 turn, must land on land."
    },
    {
      id: 2,
      name: "Pilot",
      color: "Blue",
      Action: "Once per turn, fly to any tile on the island for 1 action."
    },
    {
      id: 3,
      name: "Messenger",
      color: "Silver",
      Action: "Give Treasure cards to a player anyer on the island for 1 action."
    },
    {
      id: 4,
      name: "Explorer",
      color: "Green",
      Action: "Move and/or shore up diagonally."
    },
    {
      id: 5,
      name: "Engineer",
      color: "Red",
      Action: "Shore up 2 tiles for 1 action."
    },
  
    {
      id: 6,
      name: "Navigator",
      color: "Yellow",
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




//set player on board.

// -- use FLOOD_CARDS to get the tile that matchs players name 
// use the players starting tile ID, place player on the tile that matchs
