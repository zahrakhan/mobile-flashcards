import React, {Component} from 'react'
import {connect} from 'react-redux'
import {KeyboardAvoidingView, TextInput, StyleSheet} from 'react-native'

import {white, gray_light} from '../utils/colors'
import {addCard} from '../actions'
import {addCardToDeck} from '../utils/api'
import SubmitButton from './SubmitButton'

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
        const {title} = this.props.navigation.state.params
        const {question, answer} = this.state
        this
            .props
            .dispatch(addCard(title, {question, answer}))
        this.reset()
        this.goBack()

        addCardToDeck(title, {question, answer})

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
        const {question, answer} = this.state
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
                <SubmitButton onPress={this.handleSubmit}/>
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
    heading: {
        fontSize: 30,
        paddingTop: 20,
        textAlign: 'center'
    },
    input: {
        width: 300,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: gray_light,
        margin: 50
    }
})

export default connect()(AddCard)