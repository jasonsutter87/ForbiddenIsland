const { GAME_STATUS, TREASURES, GAME_VARIANT } = require("../Enums/enums")

const GAME_BOARDS = [
    {
        id: 1,
        name: GAME_VARIANT.standard,
        layout: [
            ['x', 'x', 'c', 'c', 'x', 'x'],
            ['x', 'c', 'c', 'c', 'c', 'x'],
            ['c', 'c', 'c', 'c', 'c', 'c'],
            ['c', 'c', 'c', 'c', 'c', 'c'],
            ['x', 'c', 'c', 'c', 'c', 'x'],
            ['x', 'x', 'c', 'c', 'x', 'x'],
        ] 
    },
    {
        id: 2,
        name: GAME_VARIANT.island_of_shadows,
        layout: [
            ['c', 'c', 'c', 'c', 'c', 'c'],
            ['c', 'c', 'c', 'c', 'c', 'c'],
            ['c', 'c', 'c', 'c', 'c', 'c'],
            ['c', 'c', 'c', 'c', 'c', 'c'],
        ] 
    },
    {
        id: 3,
        name: GAME_VARIANT.island_of_death,
        layout: [
            ['x', 'x', 'c', 'c', 'c', 'x', 'x'],
            ['c', 'c', 'c', 'c', 'c', 'c', 'c'],
            ['x', 'c', 'c', 'c', 'c', 'c', 'x'],
            ['x', 'x', 'c', 'c', 'c', 'x', 'x'],
            ['x', 'x', 'c', 'c', 'c', 'x', 'x'],
            ['x', 'x', 'c', 'c', 'c', 'x', 'x'],
        ] 
    },
    {
        id: 4,
        name: GAME_VARIANT.bone_island,
        layout: [
            ['x', 'c', 'c', 'x', 'x', 'c', 'c', 'x'],
            ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'c'],
            ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'c'],
            ['x', 'c', 'c', 'x', 'x', 'c', 'c', 'x'],
        ] 
    },
    {
        id: 5,
        name: GAME_VARIANT.skull_island,
        layout: [
            ['c', 'c', 'c', 'c', 'c', 'c'],
            ['c', 'x', 'c', 'c', 'x', 'c'],
            ['c', 'c', 'c', 'c', 'c', 'c'],
            ['x', 'c', 'c', 'c', 'c', 'x'],
            ['x', 'c', 'c', 'c', 'c', 'x'],
        ] 
    },
    {
        id: 6,
        name: GAME_VARIANT.atoll_of_decisions,
        layout: [
            ['x', 'x', 'c', 'c', 'c', 'x', 'x'],
            ['x', 'c', 'c', 'x', 'c', 'c', 'x'],
            ['c', 'c', 'x', 'x', 'x', 'c', 'c'],
            ['c', 'x', 'x', 'x', 'x', 'x', 'c'],
            ['c', 'c', 'x', 'x', 'x', 'c', 'c'],
            ['x', 'c', 'c', 'x', 'c', 'c', 'x'],
            ['x', 'x', 'c', 'c', 'c', 'x', 'x'],
        ] 
    },
    {
        id: 7,
        name: GAME_VARIANT.volcano_island,
        layout: [
            ['c', 'c', 'c', 'c', 'c'],
            ['c', 'c', 'c', 'c', 'c'],
            ['c', 'c', 'x', 'c', 'c'],
            ['c', 'c', 'c', 'c', 'c'],
            ['c', 'c', 'c', 'c', 'c'],
        ] 
    },
    {
        id: 8,
        name: GAME_VARIANT.bay_of_gulls,
        layout: [
            ['x', 'x', 'x', 'c', 'c', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'c', 'c', 'x', 'x', 'x'],
            ['c', 'x', 'x', 'c', 'c', 'x', 'x', 'c'],
            ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'c'],
            ['x', 'c', 'c', 'c', 'c', 'c', 'c', 'x'],
            ['x', 'x', 'x', 'c', 'c', 'x', 'x', 'x'],
        ] 
    },
    {
        id: 9,
        name: GAME_VARIANT.coral_reef,
        layout: [
            ['x', 'c', 'c', 'x', 'x', 'x', 'x'],
            ['c', 'c', 'c', 'c', 'x', 'x', 'x'],
            ['c', 'c', 'c', 'c', 'c', 'c', 'x'],
            ['x', 'c', 'c', 'c', 'c', 'c', 'c'],
            ['x', 'x', 'x', 'c', 'c', 'c', 'c'],
            ['x', 'x', 'x', 'x', 'c', 'c', 'x'],
        ] 
    },
    {
        id: 10,
        name: GAME_VARIANT.bridge_of_horrors,
        layout: [
            ['c', 'c', 'c', 'x', 'x', 'x', 'c', 'c', 'c', 'c'],
            ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c'],
            ['c', 'c', 'c', 'c', 'x', 'x', 'x', 'c', 'c', 'c'],
        ] 
    },
    {
        id: 11,
        name: GAME_VARIANT.arch_of_fate,
        layout: [
            ['x', 'x', 'x', 'c', 'c', 'c', 'x', 'x', 'x'],
            ['x', 'x', 'c', 'c', 'c', 'c', 'c', 'x', 'x'],
            ['x', 'c', 'c', 'c', 'x', 'c', 'c', 'c', 'x'],
            ['c', 'c', 'c', 'x', 'x', 'x', 'c', 'c', 'c'],
            ['c', 'c', 'x', 'x', 'x', 'x', 'x', 'c', 'c'],
        ] 
    },

]

let game_details = {
    flood_deck: {
        discard: [],
        unused: [],
        removed: []
    },
    action_deck: {
        discard: [],
        unused: []
    },
    players: [],
    number_of_players: null,
    current_player: null,
    current_player_turns_left: null,
    gameBoard: GAME_BOARDS[0].layout,
    status: GAME_STATUS.notStarted,
    current_flood_level: 0
};

const PLAYER_CARDS = [
    {
      id: 1,
      name: "Diver",
      color: "Black",
      actionCards: [],
      Action: "Move through flooded or sunk areas as 1 turn, must land on land.",
      socketId: null
    },
    {
      id: 2,
      name: "Pilot",
      color: "Blue",
      actionCards: [],
      Action: "Once per turn, fly to any tile on the island for 1 action.",
      socketId: null
    },
    {
      id: 3,
      name: "Messenger",
      color: "Silver",
      actionCards: [],
      Action: "Give Treasure cards to a player anyer on the island for 1 action.",
      socketId: null
    },
    {
      id: 4,
      name: "Explorer",
      color: "Green",
      actionCards: [],
      Action: "Move and/or shore up diagonally.",
      socketId: null
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
      Action: "Move another player up to 2 adjacent tiles for 1 action.",
      socketId: null
    }
]

const ACTION_CARDS = [
{
    id: 1,
    type: "element",
    name: TREASURES.fire_treasure,
    slug: 'crystal-of-fire',

    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 2,
    type: "element",
    name: TREASURES.fire_treasure,
    slug: 'crystal-of-fire',

    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 3,
    type: "element",
    name: TREASURES.fire_treasure,
    slug: 'crystal-of-fire',

    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 4,
    type: "element",
    name: TREASURES.fire_treasure,
    slug: 'crystal-of-fire',

    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 5,
    type: "element",
    name: TREASURES.fire_treasure,
    slug: 'crystal-of-fire',

    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 6,
    type: "element",
    name: TREASURES.water_treasure,
    slug: 'ocean-chalice',

    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 7,
    type: "element",
    name: TREASURES.water_treasure,
    slug: 'ocean-chalice',

    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 8,
    type: "element",
    name: TREASURES.water_treasure,
    slug: 'ocean-chalice',

    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 9,
    type: "element",
    name: TREASURES.water_treasure,
    slug: 'ocean-chalice',

    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 10,
    type: "element",
    name: TREASURES.water_treasure,
    slug: 'ocean-chalice',

    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 11,
    type: "element",
    name: TREASURES.wind_treasure,
    slug: 'statue-of-the-wind',

    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 12,
    type: "element",
    name: TREASURES.wind_treasure,
    slug: 'statue-of-the-wind',

    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 13,
    type: "element",
    name: TREASURES.wind_treasure,
    slug: 'statue-of-the-wind',

    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 14,
    type: "element",
    name: TREASURES.wind_treasure,
    slug: 'statue-of-the-wind',

    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 15,
    type: "element",
    name: TREASURES.wind_treasure,
    slug: 'statue-of-the-wind',

    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 16,
    type: "element",
    name: TREASURES.earth_treasure,
    slug: 'earth_stone',
    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 17,
    type: "element",
    name: TREASURES.earth_treasure,
    slug: 'earth_stone',
    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 18,
    type: "element",
    name: TREASURES.earth_treasure,
    slug: 'earth_stone',
    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 19,
    type: "element",
    name: TREASURES.earth_treasure,
    slug: 'earth_stone',
    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 20,
    type: "element",
    name: TREASURES.earth_treasure,
    slug: 'earth_stone',
    actions: {
    action1: null,
    action2: null
    }
},
{
    id: 21,
    type: "Action Card",
    name: "Sandbag",
    slug: 'sandbags',

    actions: {
    action1: "Shore up any one tile on the island",
    action2: null
    },
    playing: {
    play1: 'Play at any time',
    play2: 'Does not count as an action',
    play3: 'Discard to Treasure discard pile after use',
    }

},
{
    id: 22,
    type: "Action Card",
    name: "Sandbag",
    slug: 'sandbags',

    actions: {
    action1: "Shore up any one tile on the island",
    action2: null
    },
    playing: {
    play1: 'Play at any time',
    play2: 'Does not count as an action',
    play3: 'Discard to Treasure discard pile after use',
    }
},
{
    id: 24,
    type: "Action Card",
    name: "helicopter lift",
    slug: 'helicopter-lift',

    actions: {
    action1: 'Move one or more pawns on the same tile to any other tile',
    action2: 'Lift your team off Fool\'s Landing for the win!'
    },
    playing: {
    play1: 'Play at any time',
    play2: 'Does not count as an action',
    play3: 'Discard to Treasure discard pile after use',
    }
},
{
    id: 25,
    type: "Action Card",
    name: "helicopter lift",
    slug: 'helicopter-lift',

    actions: {
    action1: 'Move one or more pawns on the same tile to any other tile',
    action2: 'Lift your team off Fool\'s Landing for the win!'
    },
    playing: {
    play1: 'Play at any time',
    play2: 'Does not count as an action',
    play3: 'Discard to Treasure discard pile after use',
    }
},
{
    id: 26,
    type: "Action Card",
    name: "helicopter lift",
    slug: 'helicopter-lift',

    actions: {
    action1: 'Move one or more pawns on the same tile to any other tile',
    action2: 'Lift your team off Fool\'s Landing for the win!'
    },
    playing: {
    play1: 'Play at any time',
    play2: 'Does not count as an action',
    play3: 'Discard to Treasure discard pile after use',
    }
},
{
    id: 27,
    type: "Action Card",
    name: "water rises",
    slug: 'water-rise',

    actions: {
    action1: "",
    action2: "",
    }
},
{
    id: 28,
    type: "Action Card",
    name: "water rises",
    slug: 'water-rise',

    actions: {
    action1: "",
    action2: "",
    }
},
{
    id: 29,
    type: "Action Card",
    name: "water rises",
    slug: 'water-rise',

    actions: {
    action1: "",
    action2: "",
    }
}
]
  
const FLOOD_CARDS = [
{
    id: 1,
    name: "Whispering Garden",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: true,
    starting_position: null,
    treasure: TREASURES.wind_treasure,
    slug: "whispering-garden"
},
{
    id: 2,
    name: "Howling Garden",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: true,
    starting_position: null,
    treasure: TREASURES.wind_treasure,
    slug: "howling-garden"
},
{
    id: 3,
    name: "Temple of the Moon",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: true,
    starting_position: null,
    treasure: TREASURES.earth_treasure,
    slug: "temple-of-the-moon"
},
{
    id: 4,
    name: "Temple of the Sun",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: true,
    starting_position: null,
    treasure: TREASURES.earth_treasure,
    slug: "temple-of-the-sun"
},
{
    id: 5,
    name: "Coral Palace",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: true,
    starting_position: null,
    treasure: TREASURES.water_treasure,
    slug: "coral-palace"
},
{
    id: 6,
    name: "Tidal Palace",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: true,
    starting_position: null,
    treasure: TREASURES.water_treasure,
    slug: "tidal-palace"
},
{
    id: 7,
    name: "Cave of Embers",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: true,
    starting_position: null,
    treasure: TREASURES.fire_treasure,
    slug: "cave-of-embers"
},
{
    id: 8,
    name: "Cave of Shadows",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: true,
    starting_position: null,
    treasure: TREASURES.fire_treasure,
    slug: "cave-of-shadows"
},
{
    id: 9,
    name: "Fools' Landing",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: PLAYER_CARDS[1].name,
    treasure: null,
    slug: "fools-landing"
},
{
    id: 10,
    name: "Bronze Gate",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: PLAYER_CARDS[4].name,
    treasure: null,
    slug: "bronze-gate"
},
{
    id: 11,
    name: "Gold Gate",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: PLAYER_CARDS[5].name,
    treasure: null,
    slug: "gold-gate"
},
{
    id: 12,
    name: "Silver Gate",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: PLAYER_CARDS[2].name,
    treasure: null,
    slug: "silver-gate"
},
{
    id: 13,
    name: "Copper Gate",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: PLAYER_CARDS[3].name,
    treasure: null,
    slug: "copper-gate"
},
{
    id: 14,
    name: "Iron Gate",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: PLAYER_CARDS[0].name,
    treasure: null,
    slug: "iron-gate"
},
{
    id: 15,
    name: "Cliffs of Abandon",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
    slug: "cliffs-of-abandon"
},
{
    id: 16,
    name: "Breakers Bridge",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
    slug: "breakers-bridge"
},
{
    id: 17,
    name: "Dunes of Deception",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
    slug: "dunes-of-deception"
},
{
    id: 18,
    name: "Crimson Forest",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
    slug: "crimson-forest"
},
{
    id: 19,
    name: "Observatory",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
    slug: "observatory"
},
{
    id: 20,
    name: "Watchtower",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
    slug: "watchtower"
},
{
    id: 21,
    name: "Lost Lagoon",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
    slug: "lost-lagoon"
},
{
    id: 22,
    name: "Misty Marsh",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
    slug: "misty-marsh"
},
{
    id: 23,
    name: "Phantom Rock",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
    slug: "phantom-rock"
},
{
    id: 24,
    name: "Twilight Hollow",
    current_players: [],
    flooded: false,
    sunk: false,
    can_end_game: false,
    starting_position: null,
    treasure: null,
    slug: "twilight-hollow"
}
];
  
const TREASURES_PIECES = [
    {
      id: 1,
      name: TREASURES.wind_treasure,
      slug: 'statue-of-the-wind',
      color: "Yellow"
    },
    {
      id: 2,
      name: TREASURES.fire_treasure,
      slug: 'crystal-of-fire',
      color: "Red"
    },
    {
      id: 3,
      name: TREASURES.water_treasure,
      slug: 'ocean-chalice',
      color: "Blue"
    },
    {
      id: 4,
      name: TREASURES.earth_treasure,
    slug: 'earth_stone',      color: "Purple"
    }
]

module.exports = {
    game_details,
    PLAYER_CARDS,
    ACTION_CARDS,
    FLOOD_CARDS,
    TREASURES_PIECES,
    GAME_BOARDS
}