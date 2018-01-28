import React, {Component} from 'react'
import {Text, View, TextInput, StyleSheet} from 'react-native'
import {white, gray_light} from '../utils/colors'

import SubmitButton from './SubmitButton'

class AddDeck extends Component {
    state = {
        title: ''
    }
    handleTitleChange = (title) => {
        this.setState({title})
    }
    handleSubmit = () => {
        // TODO: update redux
        // TODO: update db
    }
    render() {
        const {title} = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={this.handleTitleChange}/>
                <SubmitButton onPress={this.handleSubmit}/>
            </View>
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

export default AddDeck