import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CommunicationList from './CommunicatonList';
import MySpace from './MySpace';
import SpaceTalking from './SpaceTalking';
import DailyQuestion from './DailyQuestion';
import SpaceLetter from './SpaceLetter';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, Text, View, Button} from 'react-native';
// import Animated from 'react-native-reanimated';
// import BottomSheet from 'reanimated-bottom-sheet';

export default function App() {
  const Tab = createBottomTabNavigator();

  // const renderContent = () => (
  //   <View
  //     style={{
  //       backgroundColor: 'white',
  //       padding: 16,
  //       height: 450,
  //     }}>
  //     <Text>Swipe down to close</Text>
  //   </View>
  // );

  // const sheetRef = React.useRef(null);

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="home">
        <Tab.Screen name="talk" component={SpaceTalking} />
          <Tab.Screen name="list" component={CommunicationList} />
          <Tab.Screen name="home" component={DailyQuestion} />
          <Tab.Screen name="letter" component={SpaceLetter} />
          <Tab.Screen name="space" component={MySpace} />
        </Tab.Navigator>
      </NavigationContainer>
      {/* <>
        <View
          style={{
            flex: 1,
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button
            title="Open Bottom Sheet"
            onPress={() => sheetRef.current.snapTo(0)}
          />
        </View>
        <BottomSheet
          ref={sheetRef}
          snapPoints={[450, 300, 0]}
          borderRadius={10}
          renderContent={renderContent}
        />
      </> */}
    </>
  );
}
