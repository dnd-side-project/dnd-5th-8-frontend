import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import { Container, StyledTextInput } from "../components/styles";
const URL = "http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080";

// Show notifications when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    };
  },
});

export default function NotificationSetting(props) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [token, setToken] = useState();
  const userId = 9;

  useEffect(() => {
    // Permission for iOS
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        // Check if we already have permission
        if (statusObj.status !== "granted") {
          // If permission is not there, ask for the same
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        // If permission is still not given throw error
        if (statusObj.status !== "granted") {
          throw new Error("Permission not granted.");
        }
      })
      .then(() => {
        return Notifications.getExpoPushTokenAsync();
      })
      .then((response) => {
        const deviceToken = response.data;
        alert(deviceToken);
        setToken(deviceToken);

        console.log({ deviceToken });
        fetch(`${URL}/notice/token`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            token: deviceToken,
          }),
        });
      })
      .catch((err) => {
        alert(`유즈이펙트 에러:${err}`);
        return null;
      });

    // const data = JSON.stringify({
    //   token: {
    //     value: deviceToken,
    //   },
    //   user: {
    //     name: "솔다",
    //   },
    // });

    // const config = {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // };

    // axios.post("URL", data, config);
  }, []);

  useEffect(() => {
    const receivedSubscription = Notifications.addNotificationReceivedListener((notification) => {
      //   console.log("Notification Received!");
      //   console.log(notification);
      //   alert("Notification Received!");
      //   alert(JSON.stringify(notification));
    });
    const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Notification Clicked!");
      alert("Notification Clicked!");
      console.log(response);
      alert(JSON.stringify(response));
    });
    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, []);

  const triggerLocalNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "푸시 알람 테스트 타이틀",
        body: "바디",
      },
      trigger: null,
    });
  };

  const triggerPushNotificationHandler = () => {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip,deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: token,
        title,
        body,
      }),
    });
  };

  return (
    <Container>
      <Button title="Trigger Local Notification" onPress={triggerLocalNotificationHandler} />
      <View style={{ width: 300, height: 200 }}>
        <StyledTextInput value={title} placeholder="Title" onChangeText={setTitle} />
        <StyledTextInput value={body} placeholder="Body" onChangeText={setBody} />
        <StyledTextInput value={token} placeholder="Token" onChangeText={setToken} />
        <Button title="Trigger Push Notification" onPress={triggerPushNotificationHandler} />
      </View>
      <Button onPress={props.navigation.goBack} title="뒤로 가기" />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
