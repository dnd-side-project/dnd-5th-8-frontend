import React from 'react';

import axios from 'axios';

import { Text, Button, View, StyleSheet } from 'react-native';

export default function CheckFamilyPage(){
    const userName = '길동';
    const fullName = '홍길동';
    const attendingNum = 1;

    async function goMainHome() {
        const invitationCode = 'P2SYRO3FNU';
        const userId = 2;
        ///daily-questions/update
        const url = `http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080//space/attend/${userId}`;

        const data = {
            code : invitationCode,
        };
        try {
          const response = await axios.put(url, data);
          console.log('요청성공');
          console.log(response);
        } catch (error) {
          console.log(error);
        }
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
                        onPress = {goMainHome}
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