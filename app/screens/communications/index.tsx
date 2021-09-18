import { memo, useState } from 'react';
import IsEqual from 'react-fast-compare';
import { ScrollView, Text } from 'react-native';

function Communications(): JSX.Element {
  const [commentNum, setCommentNum] = useState<number>(0);

  return (
    <ScrollView>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
      <Text>최근 속상했던 일은 무엇인가요?</Text>
      <Text>{`${commentNum}댓글`}</Text>
    </ScrollView>
  );
}

export default memo(Communications, IsEqual);
