const GAME_STATUS = {
    notStarted: 'Not Started',
    inProgress: 'In Progress',
    lost: 'Lost',
    won: 'Won'
};

const GAME_VARIANT = {
    standard: 'Standard',
    island_of_shadows: 'Island of Shadows',
    island_of_death: 'Island of Death',
    bone_island: 'Bone Island',
    skull_island: 'Skull Island',
    atoll_of_decisions: 'Atoll of Decisions',
    volcano_island: 'Volcano Island',
    bay_of_gulls: 'Bay of Gulls',
    coral_reef: 'Coral Reef',
    bridge_of_horrors: 'Bridge of Horrors',
    arch_of_fate: 'Arch of Fate'
}

const TREASURES = {
    wind_treasure: "The Statue of The Wind",
    fire_treasure: "The Crystal of Fire",
    water_treasure: "The Ocean's Chalice",
    earth_treasure: "The Earth Stone",
}

const DIFFICULTY = {
novice: 1,
normal: 2,
elite: 3,
legendary: 4
}
  
module.exports = {
    GAME_STATUS,
    TREASURES,
    DIFFICULTY,
    GAME_VARIANT
}