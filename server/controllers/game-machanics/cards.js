// Manages the game’s card deck, including drawing cards, shuffling, and handling special cards (e.g., treasure cards).

// Function to move a card from one pile to another
let moveCardNewPile = (inbound, outbound) => {
    if (outbound.length > 0) {
        inbound.push(outbound.shift());
    }
};

// Export the functions using CommonJS syntax
module.exports = {
    moveCardNewPile
};
