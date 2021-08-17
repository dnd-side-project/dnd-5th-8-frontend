import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import axios from 'axios';

const DailyQuestion = () => {
const [state, setState] = useState({
    questionId: 0,
    questionContent: '',
    date : '',
    answer: '',
});

const { answer, questionContent} = state;

const bottomSheetRef = useRef();

const closedPercent = 3;
const openPercent = 50;
const snapPoints = useMemo(() => [`${closedPercent}%`, `${openPercent}%`], []);

  
async function loadQuestion() {
    const spaceId = 2;
    const url = `http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080/daily-questions/space/${spaceId}`;

    const response = await axios.get(url);
    console.log(response);

    const { questionId, questionContent, date } = response;
    setState({
      ...state,
      questionId,
      questionContent,
      date,
    });
};

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
          <Text>{questionContent}</Text>
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