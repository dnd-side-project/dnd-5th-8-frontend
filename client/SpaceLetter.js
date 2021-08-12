import * as React from 'react';
import {Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ReceivedMailBox from './ReceivedMailBox';
import SentMailBox from './SentMailBox';

const Tab = createMaterialTopTabNavigator();

export default function SpaceLetter() {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="받은 편지함" component={ReceivedMailBox} />
        <Tab.Screen name="보낸 편지함" component={SentMailBox} />
      </Tab.Navigator>
    </>
  );
}
