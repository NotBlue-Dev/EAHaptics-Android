import React, { useState }  from 'react';
import { View, Text, TouchableHighlight, Image, StyleSheet, ImageBackground } from 'react-native';
import {Colors, Images, Typo} from '../../styles/index'
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
    const [myText, setMyText] = useState("");

    EventRegister.addEventListener('tact-device-connected', (args) => {
        console.log('Connected')
        setMyText('Connected to bhaptics device')
    })
    
    EventRegister.addEventListener('tact-device-disconnected', () => {
        console.log('disconnected')
        setMyText('Disconnected from bhaptics device')
    })

    return (
        <View style={{flex:2, alignItems:'center', justifyContent:'center',backgroundColor: '#2F3644'}}>
            <Image
                style={styles.circle}
                source={{
                    uri: Images.circle,
                  }}
                >
            </Image>
            <TouchableHighlight activeOpacity={1} underlayColor={Colors.WARNING} style={{position:'absolute'}} onPress={() => EventRegister.emit('refresh')}>
                <Ionicons name='refresh' size={55} color='white' style={{paddingBottom:50}}/>
            </TouchableHighlight>
            <Text style={styles.text}>Click on the logo to <Text style={styles.blue}>refresh</Text> bhaptic devices</Text>
            <Text style={styles.text}>{myText}</Text>
        </View>
    );
}