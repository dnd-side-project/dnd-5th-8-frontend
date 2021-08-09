import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CommunicationList from './CommunicatonList';
import MySpace from './MySpace';
import SpaceLetter from './SpaceLetter';
import SpaceTalking from './SpaceTalking';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="talk" component={SpaceTalking} />
          <Tab.Screen name="list" component={CommunicationList} />
          <Tab.Screen name="letter" component={SpaceLetter} />
          <Tab.Screen name="space" component={MySpace} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
