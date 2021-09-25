import * as React from 'react';

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