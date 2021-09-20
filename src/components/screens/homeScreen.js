import React, { useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, forceUpdate } from 'react-native';
import {Colors, Typo} from '../../styles/index'
import { EventRegister } from 'react-native-event-listeners'
import Watch from '../ui/Watch'

//### LE TEXT EST TOUT EN BAS FAUT LE REMONTER

EventRegister.addEventListener('tact-device-fileLoaded', (args) => {
    console.log('fileLoaded ', args)
    setMyText('Tact file loaded')
})

EventRegister.addEventListener('data-updated', (args) => {
    console.log('data updated', arg)
    setMyText(arg)
})

export default function HomeScreen() {

    const [myText, setMyText] = useState("aaa");

    return (
        
        <View style={{flex:1, alignItems:'center', justifyContent:'center',backgroundColor: '#2F3644'}}>
            <Watch></Watch>
            <Text style={styles.text}>{myText}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        justifyContent:'center',
        alignContent:'center',
        color:'white',
        fontFamily:Typo.FONT_FAMILY_REGULAR,
        fontWeight:Typo.FONT_WEIGHT_REGULAR,
        fontSize:Typo.FONT_SIZE_TEXT
    },
});