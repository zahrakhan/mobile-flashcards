import React, {Component} from 'react'
import {Text, View, FlatList, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'

import {receiveDecks} from '../actions'
import {getDecks} from '../utils/api'
import {white, cyan_dark, gray, gray_lighter} from '../utils/colors'

class Decks extends Component {
    componentDidMount() {
        const {dispatch} = this.props

        getDecks().then((decks) => dispatch(receiveDecks(decks)))
    }

    keyExtractor = (item, index) => item.title
    renderItem = ({item}) => {
        const {title, questions} = item
        return (
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => this.props.navigation.navigate('DeckDetail', {title})}>
                    <Text style={styles.itemTitle}>{title}</Text>
                    <Text style={styles.itemDetail}>{`${questions.length? questions.length: `No`} cards`}</Text>
                </TouchableOpacity>
        )
    }

    render() {
        const {decks} = this.props
        return (
            <View style={styles.container}>
                <FlatList
                    data={Object.values(decks)}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gray_lighter
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
    itemTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: cyan_dark,
        paddingBottom: 10,
    },
    itemDetail: {
        fontSize: 16,
        color: gray,

    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    }
})

function mapStateToProps(decks) {
    return {decks}
}

export default connect(mapStateToProps,)(Decks)