import React, {Component} from 'react'
import {Text, View, StyleSheet, Platform} from 'react-native'
import {connect} from 'react-redux'
import {Ionicons} from '@expo/vector-icons'

import SubmitButton from './SubmitButton'
import TextButton from './TextButton'
import Card from './Card'
import {
    white,
    cyan_dark,
    gray,
    gray_lighter,
    green,
    red
} from '../utils/colors'
import {clearLocalNotification, setLocalNotification} from '../utils/notification'

RestartIcon = () => (<Ionicons
    name={Platform === 'ios'
    ? 'ios-refresh'
    : 'md-refresh'}
    size={15}
    color={cyan_dark}/>)

class Quiz extends Component {
    state = {
        score: 0,
        counter: 0
    }
    handleCorrectAnswer = () => {
        const {score, counter} = this.state
        this.updateQuizState(score + 1, counter + 1)
    }

    handleIncorrectAnswer = () => {
        const {score, counter} = this.state
        this.updateQuizState(score, counter + 1)
    }

    updateQuizState = (score = 0, counter = 0) => {
        this.setState({score, counter})
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
    resetDailyQuizNotification() {
        clearLocalNotification().then(setLocalNotification)
    }
    render() {
        const {title, questions} = this.props.deck
        const {counter, score} = this.state
        const card = questions[counter]
        const total_cards = questions.length
        if (counter < total_cards) {
            return (
                <View style={styles.container}>
                    <View style={styles.card_container}>
                        <Card cardNumber={counter + 1} totalCards={total_cards} {...card}/>
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
            this.resetDailyQuizNotification()
            return (
                <View style={[styles.container, styles.quizResult]}>
                    <View style={styles.center}>
                        <Text style={styles.quizResultTitle}>{this.getScoreMessage(result)}</Text>
                        <TextButton onPress={this.restartQuiz}>
                            <RestartIcon/> {` Restart Quiz`}
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
    card_container: {
        flex: 1
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    },
    quizResult: {
        backgroundColor: white
    },
    quizResultTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 10
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