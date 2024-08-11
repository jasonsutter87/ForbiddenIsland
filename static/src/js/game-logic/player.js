//Manages player-related functionality, such as movement, interactions with tiles, and inventory management.
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