import React, { useState } from 'react';

import { 
  Text,
  TextInput,
  Button
} from 'react-native';

export default function AttendSpacePage(){
    const [state, setState] = useState({
        isShown: false,  
      });

    const { isShown } = state;

    const handleChangeInput= (text) => {
        const isEmpty = text === undefined || text === '';
        if (isEmpty){
            setState({
                isShown: false,
            });
            return;
        }
        setState({
            isShown: true,
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
                />
                :
                <Button disabled
                    title="스페이스 참가"
                />
            }       
        </>
    )
}
