
import React, { Component } from 'react';
import { StyleSheet,Text,View, TouchableHighlight } from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import {Colors, Typo} from '../../styles/index'
import { EventRegister } from 'react-native-event-listeners'

class Watch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        timerStart: false,
        stopwatchStart: false,
        totalDuration: 90000,
        timerReset: false,
        stopwatchReset: false,
      };
      this.active = false
      this.toggleStopwatch = this.toggleStopwatch.bind(this);
      this.resetStopwatch = this.resetStopwatch.bind(this);
    }
   
    toggleStopwatch() {
        if(this.state.stopwatchStart) {
            options.roundButton2 = {
                marginTop: 20,
                width: 220,
                height: 220,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                borderRadius: 150,
                backgroundColor: '#3C4250',
                shadowColor: '#454C57',
                elevation: 15,
            }
            EventRegister.emit('stopRequest')
            this.resetStopwatch
        } else {
            options.roundButton2 = {
                marginTop: 20,
                width: 220,
                height: 220,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                borderRadius: 150,
                backgroundColor: '#29A3FE',
                shadowColor: '#487CA2',
                elevation: 15,
            }
            EventRegister.emit('startRequest')
        }
      this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
    }
   
    resetStopwatch() {
      this.setState({stopwatchStart: false, stopwatchReset: true});
    }
    
    getFormattedTime(time) {
        this.currentTime = time;
    };

    render() {
      return (
        <View>
            <View style={{flex:1, alignItems:'center', justifyContent:'center',backgroundColor: '#2F3644'}}>
                <TouchableHighlight activeOpacity={1} underlayColor={Colors.WARNING} onPress={this.toggleStopwatch} style={options.roundButton2}>
                    <Text style={options.text}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
                </TouchableHighlight>
                <Stopwatch laps msecs start={this.state.stopwatchStart}
                    reset={this.state.stopwatchReset}
                    options={options}
                    getTime={this.getFormattedTime} 
                />
            </View>
        </View>
      );
    }
  }

  const options = {
    container: {
        padding: 25,
      },
    text: {
        color:'white',
        fontFamily:Typo.FONT_FAMILY_SEMI_BOLD,
        fontWeight:Typo.FONT_WEIGHT_SEMI_BOLD,
        fontSize:25
    },
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    watch: {
        color:'white',
        fontFamily:Typo.FONT_FAMILY_SEMI_BOLD,
        fontWeight:Typo.FONT_WEIGHT_SEMI_BOLD,
        fontSize:25,
        backgroundColor:'white'
    },
    roundButton2: {
      marginTop: 20,
      width: 220,
      height: 220,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 150,
      backgroundColor: '#3C4250',
      shadowColor: '#454C57',
      elevation: 15,
      paddingBottom:20
    },
  };
 
export default Watch