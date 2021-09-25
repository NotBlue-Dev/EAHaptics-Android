import React, { Component } from 'react';
import { StyleSheet,Text,View, TextInput } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {Colors, Typo} from '../../styles/index'
import { EventRegister } from 'react-native-event-listeners'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import Slider from '@react-native-community/slider';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

// FINIR STYLE FLECHE  + DETAILS ET ON EST OBN

let SECTIONS = [
  {
    title: 'Interactions',
    content: [],
  },
  {
    title: 'Quest IP',
    content: 'Enter manually your ip here',
    ip:null,
  },
];

EventRegister.on('settings-updated', (arg) => {
  SECTIONS[0].content = []
  for (const [name, effect] of Object.entries(arg)) {
    let obj = {
      "name":name,
      "file":`${name}.tact`,
      "state":effect.enable,
      "intensity":effect.intensity, 
      "lock":effect.lock
    }
    SECTIONS[0].content.push(obj)
  }
});

EventRegister.on('data-updated', (arg) => {
  SECTIONS[1].ip=arg.statusIp
})

class AccordionView extends Component {
  state = {
    activeSections: [],
  };

  displaySettings = (settings) => {
    for (const [name, effect] of Object.entries(settings)) {
      console.log(name, `${name}.tact`, effect.enable, effect.intensity, effect.lock);
    }
  };

  _renderHeader = (section) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title} <Ionicons name={'arrow-forward'} size={16} color={Colors.WHITE} style={{}}/></Text>
        <View style={styles.hr}/>
      </View>
    );
  };

  _play = (names) => {
    EventRegister.emit('play-effect', {
      effect: names,
    });
  }
  
  _updateIP = (val) => {
    EventRegister.emit('define-ip', val)
  }

  _updateVal = (names,val) => {
    val = Math.round(val)
    if(val === 0) val = 0.2
    EventRegister.emit('change-setting', {
      effect: names,
      intensity: val,
    });
    
    EventRegister.emit('save-config')
  }

  _state = (current, names) => {
    const enable = !current
    EventRegister.emit('change-setting', {
      effect: names,
      enable,
    });
    EventRegister.emit('save-config')
    this.forceUpdate()
  }

  _renderContent = (section) => {
    if(section.title == 'Quest IP') {
      console.log(section)
      return (
        <View style={styles.content}>
          <Text style={styles.text}>{section.content}</Text>
          <View style={styles.box}>
            <TextInput
            style={styles.text}
            onChangeText={val => this._updateIP(val)}
            placeholder={`Current ip : ${section.ip}`}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.content}>

          {section.content.map(info => 
            <View key={info.file}>
              <Text style={styles.title} key={info.name}>{info.name}</Text>
              <Text key={info.intensity} style={styles.headerText}>Intensity</Text>
              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={0.2}
                  value={info.intensity}
                  maximumValue={5}
                  onSlidingComplete={value => this._updateVal(info.name, value)}
                  minimumTrackTintColor="#29A3FE"
                  maximumTrackTintColor="white"
                />
              </View>
              <View style={styles.btnContainer}>
                <Button
                  containerStyle={{width:wp('42%') }}
                  title={info.state ? "Enable" : "Disable"}
                  buttonStyle={{backgroundColor: '#3C4250'}}
                  titleStyle={info.state ? {color:"#29A3FE"} : {color:'#D99800'}}
                  onPress={ () => this._state(info.state, info.name)}
                  />
                <Button
                  title="Play"
                  containerStyle={{width:wp('42%') }}
                  buttonStyle={{backgroundColor: '#3C4250'}}
                  titleStyle={{color:"#29A3FE"}}
                  onPress={ () => this._play(info.name)}
                >
                </Button>
              </View>
              <View style={styles.hr}/>
            </View>
          )}
        </View >
      );
    }

  };

  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  render() {
    EventRegister.emit('get-settings');
    EventRegister.emit('get-data');
    return (
      <Accordion
      containerStyle={styles.container}
        sections={SECTIONS}
        activeSections={this.state.activeSections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
        renderAsFlatList={true}
      />
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2F3644',
      paddingLeft:10,
      paddingTop:20
    },
    slider:{
      height:40,
    }, 
    hr: {
      borderBottomColor: 'white',
      borderBottomWidth: 0.8,
      marginTop:20,
      marginBottom:20,
      marginRight:10
    },
    sliderContainer: {
      marginLeft:-15
    },
    box: {
      backgroundColor:'#3C4250',
      borderRadius:6,
      marginTop:15
    },
    text: {
        color:Colors.WHITE,  
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent:'space-around',
      marginRight:10,
      marginTop:15,
      marginBottom:15
    },
    title: {
      textAlign: 'left',
      fontSize: Typo.FONT_SIZE_BUTTON,
      fontWeight: Typo.FONT_WEIGHT_REGULAR,
      marginBottom: 20,
      color:Colors.WHITE,
    },
    header: {
      backgroundColor: '#2F3644',
      paddingLeft: 10,
      paddingRight:10,
      paddingTop:10
    },
    headerText: {
      textAlign: 'left',
      color:Colors.WHITE,
      fontSize: Typo.FONT_SIZE_TEXT,
      fontWeight: Typo.FONT_WEIGHT_REGULAR,
    },
    content: {
      padding: 10,
      backgroundColor: '#2F3644',
    }
  });

export default AccordionView