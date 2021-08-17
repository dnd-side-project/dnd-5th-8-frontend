import * as React from 'react';
import { Button } from 'react-native';

export default function HomePage({ navigation }) {
  return (
    <>
    <Button
      title="메인홈 이동"
      onPress={() =>
        navigation.navigate('MainHome')
      }
    />
    </>
  );
}
