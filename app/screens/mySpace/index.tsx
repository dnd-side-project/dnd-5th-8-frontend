import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { Text, View } from 'react-native';

function MySpace(): JSX.Element {
  return (
    <View>
      <Text>MY우주</Text>
    </View>
  );
}

export default memo(MySpace, IsEqual);
