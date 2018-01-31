import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Platform
} from 'react-native';
import {Ionicons} from '@expo/vector-icons'

import TextButton from './TextButton'
import {white, gray_lighter, red, gray} from '../utils/colors'

EyeIcon = () => (<Ionicons
    name={Platform === 'ios'
    ? 'ios-eye'
    : 'md-eye'}
    size={15}
    color={red}/>)

CardFlipButton = ({label, onPress}) => (
    <TextButton
        style={{
        color: red,
        fontSize: 16
    }}
        onPress={onPress}>
        <EyeIcon/> {label}
    </TextButton>
)

export default class Card extends Component {
    state = {
        isFlipped: false
    }
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.configureFlipAnimation()
    }
    // flip card back if answer is showing
    componentWillReceiveProps() {
        if (this.state.isFlipped) {
            this.flipCard()
        }
    }
    configureFlipAnimation = () => {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this
            .animatedValue
            .addListener(({value}) => {
                this.value = value;
            })
        this.frontInterpolate = this
            .animatedValue
            .interpolate({
                inputRange: [
                    0, 180
                ],
                outputRange: ['0deg', '180deg']
            })
        this.backInterpolate = this
            .animatedValue
            .interpolate({
                inputRange: [
                    0, 180
                ],
                outputRange: ['180deg', '360deg']
            })
        this.backOpacity = this
            .animatedValue
            .interpolate({
                inputRange: [
                    89, 90
                ],
                outputRange: [0, 1]
            })
    }
    flipCard = () => {
        this.setState((state) => ({
            isFlipped: !state.isFlipped
        }))
        if (this.value >= 90) {
            Animated
                .spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            })
                .start();
        } else {
            Animated
                .spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            })
                .start();
        }
    }

    render() {
        const frontAnimatedStyle = {
            transform: [
                {
                    rotateY: this.frontInterpolate
                }
            ]
        }
        const backAnimatedStyle = {
            transform: [
                {
                    rotateY: this.backInterpolate
                }

            ],
            opacity: this.backOpacity
        }
        const {cardNumber, totalCards, question, answer} = this.props
        const counter = `${cardNumber}/${totalCards}`
        return (

            <View style={styles.container}>
                <View style={{
                    flex: 1
                }}>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                        <Text style={styles.flipCardCounter}>
                            {counter}
                            <Text style={styles.flipCardTitle}>
                                {`  Question`}
                            </Text>
                        </Text>

                        <Text style={styles.flipCardText}>
                            {question}
                        </Text>
                        <CardFlipButton label='Answer' onPress={this.flipCard}/>
                    </Animated.View>
                    <Animated.View
                        style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                        <Text style={styles.flipCardCounter}>
                            {counter}
                            <Text style={styles.flipCardTitle}>
                                {`  Answer`}
                            </Text>
                        </Text>
                        <Text style={styles.flipCardText}>
                            {answer}
                        </Text>
                        <CardFlipButton label='Question' onPress={this.flipCard}/>
                    </Animated.View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gray_lighter,
        alignItems: "center",
        justifyContent: "center"
    },
    flipCard: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios'
            ? 16
            : 2,
        padding: 30,
        height: 250,
        width: 300,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        backfaceVisibility: 'hidden'
    },
    flipCardBack: {
        backgroundColor: white,
        position: "absolute",
        top: 0
    },
    flipCardTitle: {
        color: gray,
        fontSize: 16,
        fontWeight: 'normal'
    },
    flipCardCounter: {
        fontWeight: 'bold'
    },
    flipCardText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 10
    }
});
