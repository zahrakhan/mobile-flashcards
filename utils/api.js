import {AsyncStorage} from 'react-native'

export const FLASHCARDS_STORAGE_KEY = 'MobileFlashcards:decks'

export function getDecks() {
    return AsyncStorage
        .getItem(FLASHCARDS_STORAGE_KEY)
        .then(JSON.parse)
}

export function getDeck(key) {
    return AsyncStorage
        .getItem(FLASHCARDS_STORAGE_KEY)
        .then(JSON.parse)
        .then(decks => decks[key]?decks[key]: {})
}

export function saveDeckTitle (title) {
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        }
    }))
}

export function addCardToDeck(title, card) {
    return AsyncStorage
        .getItem(FLASHCARDS_STORAGE_KEY)
        .then(JSON.parse)
        .then(decks => {
            AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
                [title]: {
                    ...decks[title],
                    questions: [
                        ...decks[title].questions,
                        {...card}
                    ]
                }
            }))
        })

}