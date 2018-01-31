import React from 'react'
import {StyleSheet, Text, View, Platform} from 'react-native'
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons'
import {TabNavigator, StackNavigator} from 'react-navigation'

import Decks from './Decks'
import AddDeck from './AddDeck'
import DeckDetail from './DeckDetail'
import AddCard from './AddCard'
import Quiz from './Quiz'

import {white, cyan_dark} from '../utils/colors'

const Tabs = TabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='animation' size={30} color={tintColor}/>
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
        }
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios'
            ? cyan_dark
            : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios'
                ? white
                : cyan_dark,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
})

export default Navigation = StackNavigator({
    Home: {
        screen: Tabs
    },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: cyan_dark
            }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: cyan_dark
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: 'Quiz',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: cyan_dark
            }
        }
    }
})