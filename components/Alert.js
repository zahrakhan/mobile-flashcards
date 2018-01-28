import React, {Component} from 'react'
import {Text, StyleSheet} from 'react-native'
import {red} from '../utils/colors'

export default Alert = ({message, style}) => (
    <Text style={[styles.error, style]}>{message
            ? message
            : ''}</Text>
)

const styles = StyleSheet.create({
    error: {
        color: red
    }
})