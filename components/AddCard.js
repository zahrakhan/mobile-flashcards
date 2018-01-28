import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, KeyboardAvoidingView, TextInput, StyleSheet} from 'react-native'

import {white, gray_light} from '../utils/colors'
import {addCard} from '../actions'
import {addCardToDeck} from '../utils/api'
import SubmitButton from './SubmitButton'
import Alert from './Alert'

class AddCard extends Component {
    static navigationOptions = ({navigation}) => {
        const {title} = navigation.state.params

        return {title: `Add Card to ${title}`}
    }
    state = {
        question: '',
        answer: ''
    }
    handleQuestionChange = (question) => {
        this.setState({question})
    }
    handleAnswerChange = (answer) => {
        this.setState({answer})
    }
    handleSubmit = () => {
        if (this.isCardValid()) {
            const {title} = this.props.navigation.state.params
            const {question, answer} = this.state
            this
                .props
                .dispatch(addCard(title, {question, answer}))
            this.reset()
            this.goBack()

            addCardToDeck(title, {question, answer})
        } else {
            this.setState({error: 'All fields are required'})
        }
    }
    isCardValid = () => {
        const {question, answer} = this.state
        return question && answer
    }
    reset = (question = '', answer = '') => {
        this.setState({question, answer})
    }
    goBack = () => {
        this
            .props
            .navigation
            .goBack()
    }
    render() {
        const {question, answer, error} = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={question}
                    autoFocus={true}
                    placeholder='Question'
                    onChangeText={this.handleQuestionChange}/>
                <TextInput
                    style={styles.input}
                    value={answer}
                    autoFocus={true}
                    placeholder='Answer'
                    onChangeText={this.handleAnswerChange}/>
                <Alert message={error} />
                <View style={styles.actions}>
                    <SubmitButton onPress={this.handleSubmit}/>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        backgroundColor: white
    },
    input: {
        width: 300,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: gray_light,
        margin: 10
    },
    actions: {
        marginTop: 30
    },
})

export default connect()(AddCard)