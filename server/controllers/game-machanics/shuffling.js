// Implements the Fisher-Yates shuffle algorithm and any other shuffling or randomization mechanics needed for the game.

/*
    Normal Shuffle.
*/
let shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/*
    Divided Shuffle.

    - Shuffles the top cards then places them on top of the deck.
*/
let dividedShuffle = (topCards, bottomCards) => {
    shuffle(topCards);
    console.log('dividedShuffle', topCards + ',' + bottomCards)
    return topCards + ',' + bottomCards;
}

function shuffleCards(CARDS, deckToUpdate = null) {
    return new Promise(resolve => {
        shuffle(CARDS);
        if (deckToUpdate) {
            deckToUpdate.unused = CARDS;
        }
        resolve();
    });
}

// Export functions using CommonJS syntax
module.exports = {
    shuffle,
    dividedShuffle,
    shuffleCards
};
