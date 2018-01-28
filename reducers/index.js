import {RECEIVE_DECKS, ADD_DECK, ADD_DECK_QUESTION} from '../actions'

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            const {deck} = action
            return {
                ...state,
                [deck.title]: {
                    title: deck.title,
                    questions: []
                }
            }
        case ADD_DECK_QUESTION:
            const {
                title,
                card: {
                    question,
                    answer
                }
            } = action
            return {
                ...state,
                [title]: {
                    ...state[title],
                    questions: [
                        ...state[title].questions, {
                            question: question,
                            answer: answer
                        }
                    ]
                }
            }
        default:
            return state
    }
}

export default decks