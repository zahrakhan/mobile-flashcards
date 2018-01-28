import React from 'react'
import {Text, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import {white, cyan_dark} from '../utils/colors'

export default function SubmitButton({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios'
            ? styles.iosSubmitBtn
            : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iosSubmitBtn: {
        backgroundColor: cyan_dark,
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: 150,
        marginLeft: 40,
        marginRight: 40
    },
    AndroidSubmitBtn: {
        backgroundColor: cyan_dark,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        width: 150,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    }
})