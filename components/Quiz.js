import React, {Component} from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    Platform,
    TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {FontAweome, Ionicons} from '@expo/vector-icons'

import SubmitButton from './SubmitButton'
import TextButton from './TextButton'
import {
    white,
    cyan_dark,
    gray,
    gray_lighter,
    green,
    red
} from '../utils/colors'

EyeIcon = () => (<Ionicons
    name={Platform === 'ios'
    ? 'ios-eye'
    : 'md-eye'}
    size={15}
    color={red}/>)

RestartIcon = () => (<Ionicons
    name={Platform === 'ios'
    ? 'ios-refresh'
    : 'md-refresh'}
    size={15}
    color={cyan_dark}/>)

class Quiz extends Component {
    state = {
        score: 0,
        counter: 0,
        showAnswer: false
    }
    handleCorrectAnswer = () => {
        const {score, counter, showAnswer} = this.state
        this.updateQuizState(score + 1, counter + 1, false)
    }

    handleIncorrectAnswer = () => {
        const {score, counter, showAnswer} = this.state
        this.updateQuizState(score, counter + 1, false)
    }
    updateQuizState = (score = 0, counter = 0, showAnswer = false) => {
        this.setState({score, counter, showAnswer})
    }
    flipCard = () => {
        this.setState((state) => ({
            showAnswer: !state.showAnswer
        }))
    }
    getScoreMessage = (score) => {
        const exclamation = score < 35
            ? 'Opps'
            : score < 75
                ? 'Good work'
                : 'Wohoo'
        return `${exclamation}! You answered ${score}% questions correctly.`
    }
    restartQuiz = () => {
        this.updateQuizState()
    }
    render() {
        const {title, questions} = this.props.deck
        const {showAnswer, counter, score} = this.state
        const card = questions[counter]
        const total_cards = questions.length
        if (counter < total_cards) {
            return (
                <View style={styles.container}>
                    <View style={[styles.item, styles.quizCard]}>
                        <Text style={styles.quizCounter}>{`${counter + 1}/${total_cards}`}</Text>
                        <Text style={styles.itemTitle}>{showAnswer
                                ? card.answer
                                : card.question}</Text>

                        <TextButton
                            style={{
                            color: red,
                            fontSize: 16
                        }}
                            onPress={this.flipCard}>
                            <EyeIcon/> {showAnswer
                                ? ` Question`
                                : ` Answer`}
                        </TextButton>
                    </View>
                    <View style={[styles.actions, styles.center]}>
                        <SubmitButton
                            style={{
                            backgroundColor: green
                        }}
                            onPress={this.handleCorrectAnswer}>Correct</SubmitButton>
                        <SubmitButton
                            style={{
                            backgroundColor: red
                        }}
                            onPress={this.handleIncorrectAnswer}>Incorrect</SubmitButton>
                    </View>
                </View>
            )
        } else {
            const result = ((score / total_cards) * 100).toFixed(2)
            return (
                <View style={[styles.container, styles.backgroundColor]}>
                    <View style={styles.center}>
                        <Text style={styles.itemTitle}>{this.getScoreMessage(result)}</Text>
                        <TextButton onPress={this.restartQuiz}>
                            <RestartIcon/>
                            Restart Quiz
                        </TextButton>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gray_lighter
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    },
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios'
            ? 16
            : 2,
        padding: 30,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    quizCard: {
        flex: 1,
        justifyContent: 'space-between'
    },
    quizCounter: {
        fontWeight: 'bold'
    },
    quizResult: {
        backgroundColor: white
    },
    itemTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 10
    },
    itemDetail: {
        fontSize: 16,
        color: gray
    },
    actions: {
        flex: 2
    }
})

function mapStateToProps(decks, {navigation}) {
    const {title} = navigation.state.params

    return {deck: decks[title]}
}

export default connect(mapStateToProps,)(Quiz)