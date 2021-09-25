import React, { useState }  from 'react';
import { View, Text, TouchableHighlight, Image, StyleSheet, Animated } from 'react-native';
import {Images, Typo} from '../../styles/index'
import { EventRegister } from 'react-native-event-listeners'
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    circle: {
      width: 350,
      height:350,
      padding:50,
      marginTop:75,
      margin:25

    },
    blue: {
        color:'#29A3FE',
        textAlignVertical:'bottom',
        fontFamily:Typo.FONT_FAMILY_REGULAR,
        fontWeight:Typo.FONT_WEIGHT_REGULAR,
        fontSize:Typo.FONT_SIZE_TEXT
    },
    text: {
        textAlignVertical:'bottom',
        
        color:'white',
        fontFamily:Typo.FONT_FAMILY_REGULAR,
        fontWeight:Typo.FONT_WEIGHT_REGULAR,
        fontSize:Typo.FONT_SIZE_TEXT
    },
});

export default function devicesScreen() {

    const AnimatedIcon = Animated.createAnimatedComponent(Ionicons)
    let loading = false
    let spinValue = new Animated.Value(0);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    const animatedTransition = Animated.loop(
        Animated.timing(
            spinValue, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true
            }
        )
    )

    const [myText, setMyText] = useState("");

    let _buttonOnClick = () => {
        if(!loading) {
            EventRegister.emit('refresh')
            animatedTransition.start()
            loading = true
            setTimeout(() => {
                _stopAnim()
            }, 6000);
        }

    }

    let _stopAnim = () => {
        animatedTransition.stop()
        spinValue.setValue(0)
        loading = false
    }

    EventRegister.addEventListener('tact-device-connected', (args) => {
        console.log('Connected')
        setMyText('Connected to bhaptics device')
        _stopAnim()
    })
    
    EventRegister.addEventListener('tact-device-update', (args) => {
        setMyText('Bhaptics Device Found')
        _stopAnim()
    })

    EventRegister.addEventListener('tact-device-disconnected', () => {
        console.log('disconnected')
        setMyText('Disconnected from bhaptics device')
        _stopAnim()
    })

    return (
        <View style={{flex:2, alignItems:'center', justifyContent:'center',backgroundColor: '#2F3644'}}>
            <Image
                style={styles.circle}
                source={{
                    uri: Images.circle,
                }}
            />
            <TouchableHighlight activeOpacity={1} underlayColor='none' style={{position:'absolute'}} onPress={() => _buttonOnClick()}>
                <AnimatedIcon name='refresh' size={55} color='white' style={{transform: [{rotate: spin}] }}/>
            </TouchableHighlight>
            <Text style={styles.text}>Click on the logo to <Text style={styles.blue}>refresh</Text> bhaptic devices</Text>
            <Text style={styles.text}>{myText}</Text>
        </View>
    );
}