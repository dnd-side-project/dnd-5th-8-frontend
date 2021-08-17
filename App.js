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

// import React, { useMemo } from 'react';
// import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
// import { BottomSheetHandleProps } from '@gorhom/bottom-sheet';
// import Animated, {
//   Extrapolate,
//   interpolate,
//   useAnimatedStyle,
//   useDerivedValue,
// } from 'react-native-reanimated';
// import { toRad } from 'react-native-redash';

// // @ts-ignore
// export const transformOrigin = ({ x, y }, ...transformations) => {
//   'worklet';
//   return [
//     { translateX: x },
//     { translateY: y },
//     ...transformations,
//     { translateX: x * -1 },
//     { translateY: y * -1 },
//   ];
// };

// interface HandleProps extends BottomSheetHandleProps {
//   style?: StyleProp<ViewStyle>;
// }

// const Handle: React.FC<HandleProps> = ({ style, animatedIndex }) => {
//   //#region animations
//   const indicatorTransformOriginY = useDerivedValue(() =>
//     interpolate(animatedIndex.value, [0, 1, 2], [-1, 0, 1], Extrapolate.CLAMP)
//   );
//   //#endregion

//   //#region styles
//   const containerStyle = useMemo(() => [styles.header, style], [style]);
//   const containerAnimatedStyle = useAnimatedStyle(() => {
//     const borderTopRadius = interpolate(
//       animatedIndex.value,
//       [1, 2],
//       [20, 0],
//       Extrapolate.CLAMP
//     );
//     return {
//       borderTopLeftRadius: borderTopRadius,
//       borderTopRightRadius: borderTopRadius,
//     };
//   });
//   const leftIndicatorStyle = useMemo(
//     () => ({
//       ...styles.indicator,
//       ...styles.leftIndicator,
//     }),
//     []
//   );
//   const leftIndicatorAnimatedStyle = useAnimatedStyle(() => {
//     const leftIndicatorRotate = interpolate(
//       animatedIndex.value,
//       [0, 1, 2],
//       [toRad(-30), 0, toRad(30)],
//       Extrapolate.CLAMP
//     );
//     return {
//       transform: transformOrigin(
//         { x: 0, y: indicatorTransformOriginY.value },
//         {
//           rotate: `${leftIndicatorRotate}rad`,
//         },
//         {
//           translateX: -5,
//         }
//       ),
//     };
//   });
//   const rightIndicatorStyle = useMemo(
//     () => ({
//       ...styles.indicator,
//       ...styles.rightIndicator,
//     }),
//     []
//   );
//   const rightIndicatorAnimatedStyle = useAnimatedStyle(() => {
//     const rightIndicatorRotate = interpolate(
//       animatedIndex.value,
//       [0, 1, 2],
//       [toRad(30), 0, toRad(-30)],
//       Extrapolate.CLAMP
//     );
//     return {
//       transform: transformOrigin(
//         { x: 0, y: indicatorTransformOriginY.value },
//         {
//           rotate: `${rightIndicatorRotate}rad`,
//         },
//         {
//           translateX: 5,
//         }
//       ),
//     };
//   });
//   //#endregion

//   // render
//   return (
//     <Animated.View
//       style={[containerStyle, containerAnimatedStyle]}
//       renderToHardwareTextureAndroid={true}
//     >
//       <Animated.View style={[leftIndicatorStyle, leftIndicatorAnimatedStyle]} />
//       <Animated.View
//         style={[rightIndicatorStyle, rightIndicatorAnimatedStyle]}
//       />
//     </Animated.View>
//   );
// };

// export default Handle;

// const styles = StyleSheet.create({
//   header: {
//     alignContent: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: '#fff',
//   },
//   indicator: {
//     position: 'absolute',
//     width: 10,
//     height: 4,
//     backgroundColor: '#999',
//   },
//   leftIndicator: {
//     borderTopStartRadius: 2,
//     borderBottomStartRadius: 2,
//   },
//   rightIndicator: {
//     borderTopEndRadius: 2,
//     borderBottomEndRadius: 2,
//   },
// });

// import React, { useCallback, useMemo, useRef } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';

// const App = () => {
//   // ref
//   const bottomSheetRef = useRef();

//   // variables
//   const snapPoints = useMemo(() => ['3%', '50%'], []);

//   // callbacks
//   const handleSheetChanges = useCallback((index) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   // renders
//   return (
//     <View style={styles.container}>
//       <BottomSheet
//         ref={bottomSheetRef}
//         index={1}
//         snapPoints={snapPoints}
//         onChange={handleSheetChanges}
//       >
//         <View style={styles.contentContainer}>
//           <Text>데일리퀘스쳔</Text>
//           <Text>가장 행복했던 순간은 언제인가요?</Text>
//         </View>
//       </BottomSheet>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: 'grey',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
// });

// export default App;