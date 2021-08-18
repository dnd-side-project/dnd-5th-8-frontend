import React, { useState } from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';

export default function SpaceTalking ({ navigation, route }) {
  const [state, setState] = useState({
    round: 1,  
  });

  const { round } = state;
  const sendRound = () => {
    // Todo : userId는 추후 코드를 합쳐서 state의 props로 보냄
    const { userId, spaceId, isParticipant , stompClient } = route.params;
    
    if (!isParticipant){
      const data = {
        spaceId,
        userId,
        round,
      }

      stompClient.send("/family-talk/round", {},
      JSON.stringify(data));
      console.log('round');
      console.log(stompClient);
      navigation.navigate('WaitPage', { userId, spaceId, isParticipant ,stompClient, round });
    }
  }

  const reduceRound = () => {
    if(round === 1){
      console.log('더 이상 줄일 수 없습니다.');
      return;
    }
    setState({ round: round - 1})
  }

  const increaseRound = () => setState({ round: round + 1})

    return (
        <>
        <View style={styles.container}>
          <Text>탐사 횟수를 정해주세요.</Text>
          <Button
            title = '-'
            onPress = {reduceRound}
          />
          <Text>{round} 라운드</Text>
          <Button
            title = '+'
            onPress = {increaseRound}
          />
          </View>

          <Button
            title="생성하기"
            onPress={sendRound}
          />
        </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
