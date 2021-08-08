// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import CommunicationList from './CommunicatonList';
// import MySpace from './MySpace';
// import SpaceLetter from './SpaceLetter';
// import SpaceTalking from './SpaceTalking';
// import { NavigationContainer } from '@react-navigation/native';



// export default function MainHome () {
//     const Tab = createBottomTabNavigator();
//     return (
//         <>
//             {/* <NavigationContainer> */}
//                 <Tab.Navigator>
//                     <Tab.Screen name="talk" component={SpaceTalking} />
//                     <Tab.Screen name="list" component={CommunicationList} />
//                     <Tab.Screen name="letter" component={SpaceLetter} />
//                     <Tab.Screen name="space" component={MySpace} />
//                 </Tab.Navigator>
//             {/* </NavigationContainer> */}
//         </>
//     );
// }


// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function MainHome() {
//   return (
  
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//       </Tab.Navigator>
   
//   );
// }

import React from 'react';
import { Image, ScrollView, Text } from 'react-native';

export default function MainHome () {
    const commentNum = 0
    return (
        <ScrollView>
            <Text>최근 속상했던 일은 무엇인가요?</Text><Text>{`${commentNum}댓글`}</Text>
            <Text>최근 속상했던 일은 무엇인가요?</Text><Text>{`${commentNum}댓글`}</Text>
            <Text>최근 속상했던 일은 무엇인가요?</Text><Text>{`${commentNum}댓글`}</Text>
            <Text>최근 속상했던 일은 무엇인가요?</Text><Text>{`${commentNum}댓글`}</Text>
            <Text>최근 속상했던 일은 무엇인가요?</Text><Text>{`${commentNum}댓글`}</Text>
        </ScrollView>
    );
}