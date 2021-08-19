import React, { useEffect, useContext } from "react";
import { CredentialsContext } from "./components/CredentialsContext";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Space from "./pages/Space";
import CreateSpace from "./pages/CreateSpace";
import FinishCreateSpace from "./pages/FinishCreateSpace";
import JoinSpace from "./pages/JoinSpace";
import FinishInputCode from "./pages/FinishInputCode";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Profile from "./pages/Profile";
import QuestionList from "./pages/QuestionList";
import AnswerComment from "./pages/AnswerComment";
import Comment from "./pages/Comment";
import EditProfile from "./pages/EditProfile";
import CodeLink from "./pages/CodeLink";
import NotificationSetting from "./pages/NotificationSetting";
import BottomSheet from "./pages/BottomSheet";
import Letter from "./pages/Letter";
import SendLetter from "./pages/SendLetter";
import DetailLetter from "./pages/DetailLetter";

const Stack = createStackNavigator();

export default function RootStack() {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  useEffect(() => {
    console.log("RootStack에서...", storedCredentials);
  });

  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {storedCredentials.space ? (
              <>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="MyPage" component={MyPage} />
                <Stack.Screen name="Letter" component={Letter} />
                <Stack.Screen name="SendLetter" component={SendLetter} />
                <Stack.Screen name="DetailLetter" component={DetailLetter} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="CodeLink" component={CodeLink} />
                <Stack.Screen name="NotificationSetting" component={NotificationSetting} />
                <Stack.Screen name="QuestionList" component={QuestionList} />
                <Stack.Screen name="AnswerComment" component={AnswerComment} />
                <Stack.Screen name="Comment" component={Comment} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="BottomSheet" component={BottomSheet} />
              </>
            ) : (
              <>
                {storedCredentials ? (
                  <>
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Space" component={Space} />
                    <Stack.Screen name="CreateSpace" component={CreateSpace} />
                    <Stack.Screen name="FinishCreateSpace" component={FinishCreateSpace} />
                    <Stack.Screen name="JoinSpace" component={JoinSpace} />
                    <Stack.Screen name="FinishInputCode" component={FinishInputCode} />
                  </>
                ) : (
                  <Stack.Screen name="Login" component={Login} />
                )}
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
}
