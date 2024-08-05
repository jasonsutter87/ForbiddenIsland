
/*
TODO:

///Setting up Gameplay
 - Set up the island - front end
 - Set up the players - front end modal?
  - pick how many players 2- 4
  - deal player cards
  - place players on the island
 - Set up the flood deck
    - draw 6 flood cards and flood the island

//Set Up Players Movement
    - Current Player
    - Current Location
    - IsDrowning
    - Move
    - Shore Up
    - Give Card
    - Capture Treasure
    - Helicopter Lift
    - Sandbag
    - Water Rises
    - Discard
    - Draw Treasure Cards
    - Draw Flood Cards
    - End Turn
    - Win Condition
    - Lose Condition
    - Players Hand




//Runner
 - Set up
 - Set up Gameplay

    ////Game Loop
        //Win Condition
        - Check for win condition
        - Check for lose condition
            - check water level < 10
            - check players location
            - isDrowning
            - Wind is sunk under
            - Fire is sunk under
            - Earth is sunk under
            - Water is sunk under
            - fools Landing is sunk under


        //Player Turn
        - 3 Actions
        - Draw Action Cards
        - Draw Flood Cards



*/

// Difficultys
const DIFFICULTY = {
  novice: 1,
  normal: 2,
  elite: 3,
  legendary: 4
}
// Treasures
const TREASURES = {
  wind_treasure: "Wind",
  fire_treasure: "Fire",
  water_treasure: "Water",
  earth_treasure: "Earth Stone",
}
// action Cards
const ACTION_CARDS = [
  {
    id: 1,
    type: "element",
    name: TREASURES.fire_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 2,
    type: "element",
    name: TREASURES.fire_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 3,
    type: "element",
    name: TREASURES.fire_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 4,
    type: "element",
    name: TREASURES.fire_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 5,
    type: "element",
    name: TREASURES.fire_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 6,
    type: "element",
    name: TREASURES.water_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 7,
    type: "element",
    name: TREASURES.water_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 8,
    type: "element",
    name: TREASURES.water_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 9,
    type: "element",
    name: TREASURES.water_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 10,
    type: "element",
    name: TREASURES.water_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 11,
    type: "element",
    name: TREASURES.wind_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 12,
    type: "element",
    name: TREASURES.wind_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 13,
    type: "element",
    name: TREASURES.wind_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 14,
    type: "element",
    name: TREASURES.wind_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 15,
    type: "element",
    name: TREASURES.wind_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 16,
    type: "element",
    name: TREASURES.earth_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 17,
    type: "element",
    name: TREASURES.earth_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 18,
    type: "element",
    name: TREASURES.earth_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 19,
    type: "element",
    name: TREASURES.earth_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 20,
    type: "element",
    name: TREASURES.earth_treasure,

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 21,
    type: "Action Card",
    name: "Sandbag",

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 22,
    type: "Action Card",
    name: "Sandbag",

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 24,
    type: "Action Card",
    name: "helicopter lift",

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 25,
    type: "Action Card",
    name: "helicopter lift",

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 26,
    type: "Action Card",
    name: "helicopter lift",

    actions: {
      action1: null,
      action2: null
    }
  },
  {
    id: 27,
    type: "Action Card",
    name: "water rises",

    actions: {
      action1: "",
      action2: "",
    }
  },
  {
    id: 28,
    type: "Action Card",
    name: "water rises",

    actions: {
      action1: "",
      action2: "",
    }
  },
  {
    id: 29,
    type: "Action Card",
    name: "water rises",

    actions: {
      action1: "",
      action2: "",
    }
  }
]

// Player Cards
const PLAYER_CARDS = [
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

// Flood Cards
const FLOOD_CARDS = [
  {
    id: 1,
    name: "Land 1",
    flooded: false,
    sunk: false,
    can_end_game: true,
    starting_position: null,
    treasure: TREASURES.wind_treasure,
  },
  {
    id: 2,
    name: "Land 2",
    flooded: false,
    sunk: false,
    can_end_game: true,
    starting_position: null,
    treasure: TREASURES.wind_treasure,
  },
  {
    id: 3,
    name: "Land 3",
    flooded: false,
    sunk: false,
    can_end_game: true,
    starting_position: null,
    treasure: TREASURES.earth_treasure,
  },
  {
    id: 4,
    name: "Land 4",
    flooded: false,
    sunk: false,
    can_end_game: true,
    starting_position: null,
    treasure: TREASURES.earth_treasure,
  },
  {
    id: 5,
    name: "Land 5",
    flooded: false,
    sunk: false,
    can_end_game: true,
    starting_position: null,
    treasure: TREASURES.water_treasure,
  },
  {
    id: 6,
    name: "Land 6",
    flooded: false,
    sunk: false,
    can_end_game: true,
    starting_position: null,
    treasure: TREASURES.water_treasure,
  },
  {
    id: 7,
    name: "Land 7",
    flooded: false,
    sunk: false,
    can_end_game: true,
    starting_position: null,
    treasure: TREASURES.fire_treasure,
  },
  {
    id: 8,
    name: "Land 8",
    flooded: false,
    sunk: false,
    can_end_game: true,
    starting_position: null,
    treasure: TREASURES.fire_treasure,
  },
  {
    id: 9,
    name: "Land 9",
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: PLAYER_CARDS[0].name,
    treasure: null,
  },
  {
    id: 10,
    name: "Land 10",
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: PLAYER_CARDS[1].name,
    treasure: null,
  },
  {
    id: 11,
    name: "Land 11",
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: PLAYER_CARDS[2].name,
    treasure: null,
  },
  {
    id: 12,
    name: "Land 12",
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: PLAYER_CARDS[3].name,
    treasure: null,
  },
  {
    id: 13,
    name: "Land 13",
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: PLAYER_CARDS[4].name,
    treasure: null,
  },
  {
    id: 14,
    name: "Land 14",
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: PLAYER_CARDS[5].name,
    treasure: null,
  },
  {
    id: 15,
    name: "Land 15",
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
  },
  {
    id: 16,
    name: "Land 16",
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
  },
  {
    id: 17,
    name: "Land 17",
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
  },
  {
    id: 18,
    name: "Land 18",
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
  },
  {
    id: 19,
    name: "Land 19",
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
  },
  {
    id: 20,
    name: "Land 20",
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
  },
  {
    id: 21,
    name: "Land 21",
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
  },
  {
    id: 22,
    name: "Land 22",
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
  },
  {
    id: 23,
    name: "Land 23",
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
  },
  {
    id: 24,
    name: "Land 24",
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
  }
];
// Set intial flood level
let flood_level = 0;
//starting game board temp starting position
let game_board = [
  ['x', 'x', 'c', 'c', 'x', 'x'],
  ['x', 'c', 'c', 'c', 'c', 'x'],
  ['c', 'c', 'c', 'c', 'c', 'c'],
  ['c', 'c', 'c', 'c', 'c', 'c'],
  ['x', 'c', 'c', 'c', 'c', 'x'],
  ['x', 'x', 'c', 'c', 'x', 'x'],
]

//Set up functions
let shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
let setDifficulty = difficulty => {
  flood_level = difficulty
}
let placeTilesOnBoard = (gameBoard, floodDeck) => {
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      if (gameBoard[i][j] === 'c') {
        gameBoard[i][j] = floodDeck.shift();
      }
    }
  }
}

/*
Start  New Game Runner Start
///Set up
 - Shuffle Action Cards (
    helicopter lift - 3
    sandbag - 2
    water rises - 3
    elements - 20
 )
 - Shuffle PLayer Cards (6)
 - Shuffle Flood Cards - 24
 - Set the Difficulty:
    - Novice
    - Normal
    - Elite
    - Legendary
*/
shuffle(FLOOD_CARDS)
shuffle(ACTION_CARDS);
shuffle(PLAYER_CARDS);

let shuffled_actions_cards = ACTION_CARDS;
let shuffled_player_cards = PLAYER_CARDS;
let shuffled_flood_cards = FLOOD_CARDS.slice();
let starting_flood_cards = shuffled_flood_cards.slice();

setDifficulty(DIFFICULTY.novice)
placeTilesOnBoard(game_board, shuffled_flood_cards)



//gameboard
// console.log('gameboard', game_board)
// console.log('starting_flood_cards',starting_flood_cards)
// console.log('shuffled_actions_cards',shuffled_actions_cards)
// console.log('shuffled_player_cards',shuffled_player_cards)

//End New Game Runner Start
