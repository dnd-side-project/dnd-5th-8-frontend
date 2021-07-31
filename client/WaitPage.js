import * as React from 'react';

import { Text, Button } from 'react-native';

export default function WaitPage ({ navigation }) {
    return (
        <>
        <Text>가족을 불러오는 페이지입니다.</Text>
        <Button
          title="질문 카테고리 설정 페이지 이동"
          onPress={() =>
            navigation.navigate('CategorySelection')
          }
        />
        </>
    );
}
