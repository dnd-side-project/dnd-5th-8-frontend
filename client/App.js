import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SpaceTalking from './SpaceTalking';
import CategorySelection from './CategorySelecton';
import WaitPage from './WaitPage';
import MainHome from './MainHome';
import HomePage from './HomePage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomePage} 
        />
        <Stack.Screen 
          name="MainHome" 
          component={MainHome} 
        />
        <Stack.Screen 
          name="WaitPage" 
          component={WaitPage} 
        />
        <Stack.Screen 
          name="SpaceTalking" 
          component={SpaceTalking} 
        />
        <Stack.Screen 
          name="CategorySelection" 
          component={CategorySelection} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
