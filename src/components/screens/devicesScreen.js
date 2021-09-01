import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import {Colors} from '../../styles/index'
import { EventRegister } from 'react-native-event-listeners'

//send event scanbuttonclick
export default function devicesScreen() {
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center',backgroundColor: '#2F3644'}}>
            
            <TouchableHighlight activeOpacity={1} underlayColor={Colors.WARNING} onPress={() => EventRegister.emit('onRefreshClick')}>
                <Text>CLICK TO RFRESH</Text>
            </TouchableHighlight>
        </View>
    );
}