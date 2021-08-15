import * as React from 'react';
import { Button } from 'react-native';

export default function HomePage({ navigation }) {
  return (
    <>
    <Button
      title="로그인 페이지 이동"
      onPress={() =>
        navigation.navigate('Login')
      }
    />
    <Button
      title="패밀리톡 이동"
      onPress={() =>
        navigation.navigate('Talk')
      }
    />
     <Button
      title="패밀리 체크 이동"
      onPress={() =>
        navigation.navigate('FamilyChecking')
    <Button
      title="스페이스 참여하기"
      onPress={() =>
        navigation.navigate('AttendSpace')
      }
    />
    </>
  );
}
