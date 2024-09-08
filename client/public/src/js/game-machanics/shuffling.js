//Implements the Fisher-Yates shuffle algorithm and any other shuffling or randomization mechanics needed for the game.
import { game_details } from '/src/js/game-logic/board.js';

/*
    Normal Shuffle.
*/
export let shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}


/*
    Divided Shuffle.

     - Shuffles the top cards then place on top of the deck.
*/
export let dividedShuffle = (topCards, bottomCards) => {
    shuffle(topCards)
    return topCards + ',' + bottomCards
}

export function shuffleActionCards(ACTION_CARDS) {
    return new Promise(resolve => {
        shuffle(ACTION_CARDS);
        game_details.action_deck.unused = ACTION_CARDS;
        resolve();
    });
}

export function shuffleFloodCards(FLOOD_CARDS) {
    return new Promise(resolve => {
        shuffle(FLOOD_CARDS);
        resolve();
    });
}

export function shufflePlayerCards(PLAYER_CARDS) {
    return new Promise(resolve => {
        shuffle(PLAYER_CARDS);
        resolve();
    });
}