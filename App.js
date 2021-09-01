import * as React from 'react';
import { Text, View, Container, NativeModules } from 'react-native';
import { EventRegister } from 'react-native-event-listeners'

import { NavigationContainer } from '@react-navigation/native';
import NavigBottom from './src/components/navigation/NavigBottom';
import bhapticsPlayer from './src/api/bhapticsPlayer'


const player = new bhapticsPlayer();

EventRegister.addEventListener('onRefreshClick', () => {
  player.getHapticList()
})

player.launch()

function App() {
  return (
    <NavigationContainer>
      <NavigBottom></NavigBottom>
    </NavigationContainer>
  );
}

export default App;