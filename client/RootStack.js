import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { CredentialsContext } from "./components/CredentialsContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Space from "./pages/Space";
import CreateSpace from "./pages/CreateSpace";
import JoinSpace from "./pages/JoinSpace";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Profile from "./pages/Profile";
import Comment from "./pages/Comment";
import NotificationTest from "./pages/NotificationTest";
import BottomSheet from "./pages/BottomSheet";
import Letter from "./pages/Letter";
import SendLetter from "./pages/SendLetter";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <CredentialsContext.Consumer>
        {({ storedCredentials }) => (
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              {storedCredentials ? (
                <>
                  <Stack.Screen name="Register" component={Register} />
                  <Stack.Screen name="Space" component={Space} />
                  <Stack.Screen name="CreateSpace" component={CreateSpace} />
                  <Stack.Screen name="JoinSpace" component={JoinSpace} />
                  <Stack.Screen name="Letter" component={Letter} />
                  <Stack.Screen name="SendLetter" component={SendLetter} />
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="MyPage" component={MyPage} />
                  <Stack.Screen name="Profile" component={Profile} />
                  <Stack.Screen name="Comment" component={Comment} />
                  <Stack.Screen name="NotificationTest" component={NotificationTest} />
                  <Stack.Screen name="BottomSheet" component={BottomSheet} />
                </>
              ) : (
                <Stack.Screen name="Login" component={Login} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </CredentialsContext.Consumer>
      <StatusBar style="light" />
    </>
  );
}
