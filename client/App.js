import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import TalkPage from './TalkPage';
import WaitPage from './WaitPage';
import CategorySelectionPage from './CategorySelectionPage';
import CheckFamilyPage from './CheckFamilyPage';
import AttendSpacePage from './AttendSpacePage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginPage} 
        />
        <Stack.Screen 
          name="Talk" 
          component={TalkPage} 
        />
        <Stack.Screen 
          name="Wait" 
          component={WaitPage} 
        />
        <Stack.Screen 
          name="CategorySelection" 
          component={CategorySelectionPage} 
        />
        <Stack.Screen 
          name="FamilyChecking" 
          component={CheckFamilyPage} 
          name="AttendSpace" 
          component={AttendSpacePage} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
