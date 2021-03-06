import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducer from './reducers'

import Navigation from './components/Navigation'
import FlashcardsStatusBar from './components/FlashcardsStatusBar'
import {teal} from './utils/colors'
// import {logger} from './utils/logger'

// const middleware = applyMiddleware(logger)
// let store = createStore(reducer, middleware)

let store = createStore(reducer)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <FlashcardsStatusBar backgroundColor={teal} barStyle="light-content"/>
          <Navigation />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
