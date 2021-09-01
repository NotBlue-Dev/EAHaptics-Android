import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import {Colors} from '../../styles/index'
import { EventRegister } from 'react-native-event-listeners'

export default function devicesScreen() {
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center',backgroundColor: '#2F3644'}}>
            <TouchableHighlight activeOpacity={1} underlayColor={Colors.WARNING} onPress={() => EventRegister.emit('onRefreshClick')}>
                <Text>CLICK TO RFRESH</Text>
            </TouchableHighlight>
        </View>
    );
}

EventRegister.addEventListener('tact-device-fileLoaded', (args) => {
    console.log(args)
})

EventRegister.addEventListener('tact-device-connected', (args) => {
    console.log('device connected')
})

EventRegister.addEventListener('tact-device-disconnected', (args) => {
    console.log("device disconnected")
})