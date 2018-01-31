import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, KeyboardAvoidingView, TextInput, StyleSheet} from 'react-native'
import {NavigationActions} from 'react-navigation'
import {white, gray_light} from '../utils/colors'
import {addDeck} from '../actions'
import {saveDeckTitle} from '../utils/api'
import SubmitButton from './SubmitButton'
import Alert from './Alert'

class AddDeck extends Component {
    state = {
        title: '',
        error: ''
    }
    handleTitleChange = (title) => {
        this.setState({title})
    }
    handleSubmit = () => {
        if (this.isDeckValid()) {
            const {title} = this.state
            this
                .props
                .dispatch(addDeck({title}))

            this.reset()
            this.toDetail(title)

            saveDeckTitle(title)
        } else {
            this.setState({error: 'Title is required'})
        }

    }
    isDeckValid = () => {
        return this.state.title || false
    }
    reset = (title = '') => {
        this.setState({title})
    }
    toDetail = (title) => {
        this
            .props
            .navigation
            .navigate('DeckDetail', {title})
    }
    render() {
        const {title, error} = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.heading}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    autoFocus={true}
                    placeholder='Title'
                    onChangeText={this.handleTitleChange}/>
                <Alert message={error}/>
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
        margin: 10
    },
    actions: {
        marginTop: 30
    }
})

export default connect()(AddDeck)