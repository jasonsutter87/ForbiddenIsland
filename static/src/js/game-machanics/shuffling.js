//Implements the Fisher-Yates shuffle algorithm and any other shuffling or randomization mechanics needed for the game.

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