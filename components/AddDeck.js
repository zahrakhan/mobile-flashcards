import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Text, KeyboardAvoidingView, TextInput, StyleSheet} from 'react-native'

import {white, gray_light} from '../utils/colors'
import {addDeck} from '../actions'
import {saveDeckTitle} from '../utils/api'
import SubmitButton from './SubmitButton'

class AddDeck extends Component {
    state = {
        title: ''
    }
    handleTitleChange = (title) => {
        this.setState({title})
    }
    handleSubmit = () => {
        const {title} = this.state
        this
            .props
            .dispatch(addDeck({title}))

        this.reset()
        // TODO: to home

        saveDeckTitle(title)
    }
    reset = (title = '') => {
        this.setState({title})
    }
    render() {
        const {title} = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.heading}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    autoFocus={true}
                    onChangeText={this.handleTitleChange}/>
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

export default connect()(AddDeck)