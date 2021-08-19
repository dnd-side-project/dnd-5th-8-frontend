import * as React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function StartTalking({ route }) {
  const navigation = useNavigation();
  const userId = 11;
  const spaceId = 23;
  const { isParticipant, stompClient }= route.params;

  const defineIsParticipant = () => {
    const url = `http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080/family-talk/start/${spaceId}`;
  
    const response = axios.get(url);
    console.log(response);
    return response;
  }
  
  const startGame = () => {
      navigation.navigate('SpaceTalking', { userId, spaceId, isParticipant ,stompClient });
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
        onPress={startGame}
      />
    }
    
    <Button
      title="웹 소켓 연결"
      onPress={startGame}
    />
    </>
  );
}
