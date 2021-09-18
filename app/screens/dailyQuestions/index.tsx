import { memo, useCallback, useMemo, useState } from 'react';
import IsEqual from 'react-fast-compare';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { QuestionDTO, SendAnswerRequest } from '@/dtos';
import { getQuestionAsync, sendAnswerAsync } from '@/services';
import { styles } from './styles';

const closedPercent = 3;
const openPercent = 50;

function DailyQuestions(): JSX.Element {
  const [question, setQuestion] = useState<QuestionDTO>();
  const [answer, setAnswer] = useState<string>('');

  const snapPoints = useMemo(() => [`${closedPercent}%`, `${openPercent}%`], []);

  const loadQuestionsAsync = useCallback(async (): Promise<void> => {
    try {
      const res = await getQuestionAsync(2);
      setQuestion(res);
    } catch (e) {
      Alert.alert('Error', '데이터를 불러오던 중 오류가 발생했습니다.');
    }
  }, []);

  const onSheetChanges = useCallback((index: number) => {
    if (index === 1) {
      loadQuestionsAsync();
    }
  }, []);

  const onOkPressAsync = useCallback(async (): Promise<void> => {
    if (!answer) {
      Alert.alert('Error', '답변을 입력해 주세요.');
      return;
    }

    try {
      const data: SendAnswerRequest = {
        userId: 2,
        content: answer,
      };
      const res = await sendAnswerAsync(data, 1, 2);
      console.log(res);
    } catch (e) {
      Alert.alert('Error', '서버와 통신하던 중 오류가 발생했습니다.');
    }
  }, [answer]);

  return (
    <View style={styles.container}>
      <BottomSheet index={1} snapPoints={snapPoints} onChange={onSheetChanges}>
        <View style={styles.contentContainer}>
          <Text>데일리퀘스쳔</Text>
          <Text>{question?.questionContent}</Text>
          <TextInput placeholder="답을 작성해주세요" onChangeText={setAnswer} />
          <Button title="확인" onPress={onOkPressAsync} />
        </View>
      </BottomSheet>
    </View>
  );
}

export default memo(DailyQuestions, IsEqual);
