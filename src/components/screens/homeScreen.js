import React from 'react';
import { View, StyleSheet } from 'react-native';
import {Colors, Typo} from '../../styles/index'
import Watch from '../ui/Watch'

export default function HomeScreen() {

    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center',backgroundColor: '#2F3644'}}>
            <Watch></Watch>
        </View>
    );
}