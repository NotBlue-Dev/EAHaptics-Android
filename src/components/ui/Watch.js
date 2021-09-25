
import React from 'react';
import { Text,View, TouchableHighlight } from 'react-native';
import { Stopwatch} from 'react-native-stopwatch-timer';
import {Typo} from '../../styles/index'
import { EventRegister } from 'react-native-event-listeners'

class Watch extends React.Component {
    constructor(props) {
      super(props);
      this.txt = props.content
      this.state = {
        timerStart: false,
        stopwatchStart: false,
        totalDuration: 90000,
        timerReset: false,
        stopwatchReset: false,
        myText: "",
        
      };
      this.active = false
      this.init = false
      this.toggleStopwatch = this.toggleStopwatch.bind(this);
      this.resetStopwatch = this.resetStopwatch.bind(this);
      this.loadEvent = this.loadEvent.bind(this);  
    }
    
    toggleStopwatch() {
      this.loadEvent()
      EventRegister.emit('get-data')
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
                elevation: 6,
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
                elevation: 6,
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

    loadEvent() {
      if(!this.init) {
        EventRegister.addEventListener('tact-device-fileLoaded', (args) => {
          console.log('fileLoaded ', args)
        })
        EventRegister.addEventListener('data-updated', (args) => {
            if(args.logs[args.logs.length-1] !== undefined && args.logs[args.logs.length-1] !== this.state.myText) {
              this.setState({myText:args.logs[args.logs.length-1]})
            }
            if(args.statusIpValid != true) {
              this.setState({myText:'No valid ip is registered'})
            }
            if(args.statusHaptic != true) {
              this.setState({myText:'No Bhaptic Device connected'})
            }
        })
  
        EventRegister.emit('get-data')
        this.init = true
      }
    }

    render() {
      return (
        <View>
            <View style={{flex:1, alignItems:'center', justifyContent:'center',backgroundColor: '#2F3644'}}>
                <TouchableHighlight activeOpacity={1} underlayColor="none" onPress={this.toggleStopwatch} style={options.roundButton2}>
                    <Text style={options.text}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
                </TouchableHighlight>
                <Stopwatch laps msecs start={this.state.stopwatchStart}
                    reset={this.state.stopwatchReset}
                    options={options}
                    getTime={this.getFormattedTime} 
                />
                <Text style={options.log}>{this.state.myText}</Text>
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
    log: {
      color:'white',
      fontFamily:Typo.FONT_FAMILY_REGULAR,
      fontWeight:Typo.FONT_WEIGHT_REGULAR,
      fontSize:15
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
      elevation: 6,
      paddingBottom:20
    },
  };
 
export default Watch