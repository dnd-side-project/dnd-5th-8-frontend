import React, { useState } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CommunicationList from './CommunicatonList';
import MySpace from './MySpace';
import StartTalking from './StartTalking';
import DailyQuestion from './DailyQuestion';
import SpaceLetter from './SpaceLetter';
import axios from 'axios';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default function MainHome( { navigation }) {
const Tab = createBottomTabNavigator();

const [state, setState] = useState({
  isParticipant: false,
});
let temp = null;
const { isParticipant } = state;
const spaceId = 23;

const makeRoom = () => {
  const url = 'http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080/family-talk-connect';
  const socket = new SockJS(url);
  let stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    stompClient.subscribe(`/queue/active/${spaceId}`, function (msg) {
      if (msg.body) {
        const response = JSON.parse(msg.body);
        console.log("got message : " + response);
        const { active } = response;
        console.log("active : " + active);
        if (active === true) {
          setState({
            ...state,
            isParticipant: active,
          });
        }
      } else {
        console.log("got empty message");
      }
    });

    stompClient.subscribe(`/topic/ready/${spaceId}`, function (msg) { 
      if (msg.body) {
        const response = JSON.parse(msg.body);
        console.log("got message : " + response);
        const { nickName, profile } = response; 
        console.log("nickName : " + nickName);      
        console.log("profile : " + profile);      
        setState({
          ...state,
          nickName,
          profile,
        })
      } else {
        console.log("got empty message");
      }
    });
    navigation.navigate('talk', { isParticipant ,stompClient });
  });
}

const defineIsParticipant = async () => {
  const url = `http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080/family-talk/start/${spaceId}`;

  try{
    const response = await axios.get(url);
    setState({
      ...state,
      isParticipant: response.data,
    });
    makeRoom();
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
            }
          }}
          component={StartTalking}
          />
          <Tab.Screen name="list" component={CommunicationList} />
          <Tab.Screen name="home" component={DailyQuestion} />
          <Tab.Screen name="letter" component={SpaceLetter} />
          <Tab.Screen name="space" component={MySpace} />
        </Tab.Navigator>
    </>
  );
}
