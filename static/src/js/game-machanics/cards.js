//Manages the game’s card deck, including drawing cards, shuffling, and handling special cards (e.g., treasure cards).
import { shuffle, dividedShuffle } from "./shuffling.js";

export let moveCardNewPile = (inbound, outbound) => {
    if (outbound.length > 0) {
      inbound.push(outbound.shift());
    }
};