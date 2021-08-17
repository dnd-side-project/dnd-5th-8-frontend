// import React, { createRef } from "react";
// import { Text, View, TouchableOpacity } from 'react-native';
// import ActionSheet from "react-native-actions-sheet";


// const actionSheetRef = createRef();

// export default function DailyQuestion() {
//   let actionSheet;

//   return (
//     <>
//       <View
//       style={{
//         justifyContent: "center",
//         flex: 1
//       }}
//     >
//       <TouchableOpacity
//         onPress={() => {
//           actionSheetRef.current?.setModalVisible();
//         }}
//       >
//         <Text>Open ActionSheet</Text>
//       </TouchableOpacity>

//       <ActionSheet ref={actionSheetRef}>
//         <View>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//         </View>
//       </ActionSheet>
//     </View>
//     </>
//   );
// }

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import axios from 'axios';

const DailyQuestion = () => {
  const [state, setState] = useState({
    // questionContents: [],
    questionId: 0,
    questionContent: '',
    date : '',
    answer: '',
  });

  const { questionId, spaceId, answer, questionContent} = state;
  // ref
  const bottomSheetRef = useRef();

  // variables
  const closedPercent = 3;
  const openPercent = 50;
  const snapPoints = useMemo(() => [`${closedPercent}%`, `${openPercent}%`], []);

  
  async function loadQuestion() {
    const spaceId = 2;
    const url = `http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080/daily-questions/space/${spaceId}`;
    // const url = `http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8081/daily-questions/update`;
  
    console.log('loadQuestion');
    const response = await axios.get(url);
    console.log(response);
    // try {
    //   console.log('loadQuestion2');
    //   const response = await axios.get(url);
    //   console.log(response);
    // } catch (error) {
    //   console.log('loadQuestion3');
    //   console.log(error);
    // }

    const { questionId, questionContent, date } = response;
    setState({
      ...state,
      questionId,
      questionContent,
      date,
      // questionContents: [
      //   ...questionContents,
      //   {
      //     questionId,
      //     questionContent,
      //     date,
      //   }
      // ]
    });
  };

  // useEffect(() => loadQuestion,[]);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    if (index === 1) {
       loadQuestion();
    }
  }, []);



  async function sendAnswer() {
    const spaceId = 2;
    const url = `http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080/daily-questions/1/answer/space/2`; //${questionId}/answer/space/${spaceId}`;
  
    const userId = 2;
    console.log(answer);
    console.log(typeof(answer));
    const data = {
      content: answer,
      userId,
    };

    try {
      const response = await axios.post(url, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeInput= (text) => {
    // const answer = event.target.value;
    const isEmpty = text === undefined || text === '';
    if (isEmpty){
        setState({
          ...state,
          answer: '',
        });
        return;
    }
    setState({
        ...state,
        answer: text, 
    });
    console.log(answer);
}

  // renders
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>데일리퀘스쳔</Text>
          <Text>왜 오류가 나니</Text>
          <TextInput
            placeholder="답을 작성해주세요"
            onChangeText={handleChangeInput}
          />
          <Button 
            title="확인"
            onPress={()=>
              sendAnswer()
            }
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default DailyQuestion;