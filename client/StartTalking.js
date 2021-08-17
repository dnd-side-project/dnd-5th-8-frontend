import * as React from 'react';
import { Button } from 'react-native';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useNavigation } from '@react-navigation/native';

export default function StartTalking({ isParticipant }) {
  const navigation = useNavigation();
  const userId = 1;
  const spaceId = 5;

  const defineIsParticipant = () => {
    const url = `http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080/family-talk/start/${spaceId}`;
  
    const response = axios.get(url);
    console.log(response);
    return response;
  }
  
  const makeRoom = () => {
      const url = 'http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080/family-talk-connect';
      const socket = new SockJS(url);
      const stompClient = Stomp.over(socket);
  
      stompClient.connect({}, () => {
  
      });
      
      navigation.navigate('SpaceTalking');
  }

  return (
    <>
    {isParticipant ? 
      <Button disabled
        title="우주토킹 입장하기!"
        onPress={() =>
          navigation.navigate('SpaceTalking')}
      />
      :
      <Button
        title="우주토킹 시작하기!"
        onPress={makeRoom}
      />
    }
    
    <Button
      title="웹 소켓 연결"
      onPress={makeRoom}
    />
    </>
  );
}
