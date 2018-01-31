import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {FontAwesome} from '@expo/vector-icons'

import {white, cyan_dark, gray} from '../utils/colors';
import TextButton from './TextButton'
import SubmitButton from './SubmitButton'

class DeckDetail extends Component {
    static navigationOptions = ({navigation}) => {
        const {title} = navigation.state.params

        return {title}
    }

    render() {
        const {
            deck: {
                title,
                questions
            },
            addCard,
            startQuiz
        } = this.props
        
        return (
            <View
                style={[
                styles.container,
                styles.center, {
                    justifyContent: 'space-around'
                }
            ]}>
                <View style={styles.item}>
                    <Text style={styles.itemTitle}>{title}</Text>
                    <Text style={styles.itemDetail}>
                        {`${questions.length
                            ? questions.length
                            : `No`} cards`}</Text>
                </View>
                <View style={styles.actions}>
                    <TextButton
                        style={styles.addButton}
                        onPress={addCard}>
                        +Add Card
                    </TextButton>
                    {questions.length > 0 && (
                        <SubmitButton onPress={startQuiz}>Start Quiz</SubmitButton>
                    )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        backgroundColor: white
    },
    item: {
        flex: 4,
        padding: 30,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    itemDetail: {
        fontSize: 20,
        color: gray
    },
    actions: {
        flex: 2
    },
    addButton: {
        fontSize: 17,
        marginBottom: 15
    }
})

function mapStateToProps(decks, {navigation}) {
    const {title} = navigation.state.params

    return {title, deck: decks[title]}
}

function mapDispatchToProps(dispatch, {navigation}) {
    const {title} = navigation.state.params
    return {
        addCard: () => navigation.navigate('AddCard', {title}),
        startQuiz: () => navigation.navigate('Quiz', {title})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)