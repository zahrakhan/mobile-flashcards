export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_DECK_QUESTION = 'ADD_DECK_QUESTION'

export function receiveDecks(decks) {
    return {type: RECEIVE_DECKS, decks}
}

export function addDeck(deck) {
    return {type: ADD_DECK, deck}
}
export function addDeckQuestion(title, card) {
    return {type: ADD_DECK_QUESTION, title, card}
}
