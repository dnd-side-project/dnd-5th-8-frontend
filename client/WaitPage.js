import React, { useEffect } from 'react';

import { Text, Button, View, StyleSheet } from 'react-native';

export default function WaitPage ({ navigation, route }) {
    const data = [
      {
        id: '1',
        title: 'person 1',
      },
    ];
    const { userId, spaceId, isParticipant ,stompClient, round } = route.params;

    const showNewParticipant = (stompClient) => {
      // Todo : 참여하는 새로운 팀원들을 보여줍니다.
    }

    const renderItem = ({ item }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );

    const inviteFamily = () => {
      const nextId = data.length + 1
      console.log(data)
      data.push({
        id: `${nextId}`,
        title: `person ${nextId}`
      });
    }

    return (
        <>
        <View>
        <Text>함께할 우주비행사를 기다리고 있어요.</Text>
        <Button
          title = '불러오기'
          onPress = {inviteFamily}
        />
        <Button
          title = '다 모였어요'
          onPress={() =>
            navigation.navigate('CategorySelection')
          }
        />
        </View>
        </>
    );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: '20px',
    marginVertical: '8px',
    marginHorizontal: '16px',
  },
  title: {
  },
});
