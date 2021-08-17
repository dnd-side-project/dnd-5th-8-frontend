import React, { useState } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CommunicationList from './CommunicatonList';
import MySpace from './MySpace';
import StartTalking from './StartTalking';
import DailyQuestion from './DailyQuestion';
import SpaceLetter from './SpaceLetter';
import axios from 'axios';

export default function MainHome( { navigation }) {
const Tab = createBottomTabNavigator();

const [state, setState] = useState({
  isParticipant: false,
});

const { isParticipant } = state;

const defineIsParticipant = () => {
  const spaceId = 5;
  const url = `http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080/family-talk/start/${spaceId}`;

  try{
    const response = axios.get(url);
    console.log(response);
    setState({
      ...state,
      isPraticipant: response,
    })
  } catch (error) {
    console.log(error);
  }
}

  return (
    <>
        <Tab.Navigator initialRouteName="home">
        <Tab.Screen 
          name="talk"
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              defineIsParticipant();
              navigation.navigate('talk');
            }
          }}
          children={() => <StartTalking isParticipant={isParticipant}></StartTalking>}
          />
          <Tab.Screen name="list" component={CommunicationList} />
          <Tab.Screen name="home" component={DailyQuestion} />
          <Tab.Screen name="letter" component={SpaceLetter} />
          <Tab.Screen name="space" component={MySpace} />
        </Tab.Navigator>
    </>
  );
}
