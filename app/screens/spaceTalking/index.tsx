import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { Text, View } from 'react-native';

function SpaceTalking(): JSX.Element {
  return (
    <View>
      <Text>우주토킹</Text>
    </View>
  );
}

export default memo(SpaceTalking, IsEqual);
