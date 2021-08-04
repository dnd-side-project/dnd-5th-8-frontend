import React from 'react';

import { Text, Button, View, StyleSheet } from 'react-native';

export default function CheckFamilyPage(){
    const userName = '길동';
    const fullName = '홍길동';
    const attendingNum = 1;

    function goFamilyHome() {
        //Todo: 메인 홈 화면으로 이동
    };

    function goPreviousScreen() {
        //Todo: 이전 화면으로 이동
    };

    return (
        <>
            <Text>{`${userName}님의\n가족이 맞나요?`}</Text>
            <View style={styles.container}>
                    <Text>{`${userName}'s 패밀리 스페이스`}</Text>
                    <Text>{`${fullName}님외 ${attendingNum}명 참가 중`}</Text>
                    <Button
                        title="우리 가족이 맞아요!"
                        onPress = {goFamilyHome}
                    />
                    <Button
                        title="이전 화면으로"
                        onPress = {goPreviousScreen}
                    />
                
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow',
        padding: 20,
        margin: 20,
      },
  });