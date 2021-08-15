import React from 'react';

import axios from 'axios';

import {Text, Button} from 'react-native';

export default function App(){
    const handleClick = () => {
      const url = `http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080/space/create`; 
      console.log('test');
      const data = {
        id: 2,
        name: '에잇',
      };

      axios
          .post(url, data)
          .then((res) => {
            console.log("요청 성공");
            console.log(JSON.stringify(res));
          })
          .catch((error) => console.log("요청 오류"));
    }

    return (
        <>
        <Text>스페이스 생성완료! 코드로 가족들을 초대해주세요</Text>
            <Button
              title="코드 생성"
              nPress={handleClick}
            />
        </>
    )
}
