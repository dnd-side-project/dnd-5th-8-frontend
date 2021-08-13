import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

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

export default function NotificationTest(props) {
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
        alert(response);
        const deviceToken = response.data;
        console.log({ deviceToken });
      })
      .catch((err) => {
        alert(err);
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

  return (
    <View style={styles.container}>
      <Button title="Trigger Local Notification" onPress={triggerLocalNotificationHandler} />
      <Button onPress={props.navigation.goBack} title="뒤로 가기" />
    </View>
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
