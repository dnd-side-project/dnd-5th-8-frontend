import React, { useState } from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';

export default function TalkPage ({ navigation }) {
  const [state, setState] = useState({
    round: 1,  
  });

  const { round } = state;

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
            title="가족 대기방 이동"
            onPress={() =>
              navigation.navigate('Wait')
            }
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
