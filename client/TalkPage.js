import * as React from 'react';

import { Text, Button } from 'react-native';

export default function TalkPage ({ navigation, route }) {
    return (
        <>
        <Text>패밀리톡의 라운드 횟수를 정합니다</Text>
        <Button
          title="가족 대기방 이동"
          onPress={() =>
            navigation.navigate('Wait')
          }
        />
        </>
    );
}
