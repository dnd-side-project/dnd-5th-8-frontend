import React, { useState } from 'react';


import axios from 'axios';

import { 
  Text,
  TextInput,
  Button
} from 'react-native';

export default function AttendSpacePage(){
    const [state, setState] = useState({
        isShown: false,
        inputCode: "",
        spaceName: "",
        userCount: 0,
      });

    const { isShown, inputCode } = state;

    const getSpaceInfo = () => {
        console.log('코드:'+inputCode);
        console.log(typeof(inputCode));
        const url = 'http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080/space/attend/' + inputCode; //code는 방생성시 만들어진 코드를 입력해야합니다.

        axios
            .get(url, {params : { headers: {"Access-Control-Allow-Origin": "*"}}}) //, { headers: {"Access-Control-Allow-Origin": "*"}}
            .then((res) => {
                console.log("요청 성공");
                const data = JSON.stringify(res);
                const { spaceName, userCount, isExist } = data;
                console.log(data);
                setState({
                    spaceName,
                    userCount,
                    isShown: isExist,
                })
            })
            .catch((error) => console.log(error));
    }

    const handleChangeInput= (text) => {
        const isEmpty = text === undefined || text === '';
        if (isEmpty){
            setState({
                isShown: false,
                inputCode: "",
            });
            return;
        }
        setState({
            isShown: true,
            inputCode: text, 
        });
    }

    return (
        <>
        <Text>
            {`가족이 알려준\n초대 코드를 입력해주세요.`}
        </Text>
        <TextInput
            underlineColorAndroid="blue"
            placeholder="초대코드"
            placeholderTextColor="black"
            onChangeText={handleChangeInput}
        />
            {isShown ? 
                <Button
                    title="스페이스 참가"
                    onClick={getSpaceInfo}
                />
                :
                <Button disabled
                    title="스페이스 참가"
                />
            }       
        </>
    )
}
