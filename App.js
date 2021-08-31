import * as React from 'react';
import { Text, View, Container } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import NavigBottom from './src/components/navigation/NavigBottom';

function App() {
  return (
    <NavigationContainer>
      <NavigBottom></NavigBottom>
    </NavigationContainer>
  );
}

export default App;