import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Image, Platform, View, Text, Button, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../components/CredentialsContext";
import axios from "axios";

import {
  Container,
  SpaceButton,
  StyledTextInput,
  Title,
  Label,
  Label2,
  Label3,
  Avatar,
  TestButton,
  LogOutButton,
} from "../components/styles";

import { LinearGradient } from "expo-linear-gradient";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import BottomSheet from "reanimated-bottom-sheet";

const URL = "http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080";

const Tab = createBottomTabNavigator();
import Main from "./Main";
import EditProfile from "./EditProfile";
import MyPage from "./MyPage";
import QuestionList from "./QuestionList";
import Letter from "./Letter";

function MyTabs() {
  return (
    <>
      <Tab.Navigator
        initialRouteName={" "}
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarActiveTintColor: "#611DF2",
          tabBarInactiveTintColor: "#797E8B",
          tabBarStyle: { position: "absolute", backgroundColor: "white" },
          tabBarIcon: () => {
            size: 0;
          },
          tabBarBackground: () => (
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", zIndex: 1 }}>
              <Image source={require("../assets/talking.png")} style={{ right: 15, top: 8 }} />
              <Image source={require("../assets/list.png")} style={{ left: 5, top: 8 }} />
              <Image source={require("../assets/planet.png")} style={{ bottom: 17, zIndex: 1 }} />
              <Image source={require("../assets/letter2.png")} style={{ right: 6, top: 10 }} />
              <Image source={require("../assets/my.png")} style={{ left: 12, top: 8 }} />
            </View>
          ),
        }}
      >
        <Tab.Screen name="우주토킹" component={EditProfile} />
        <Tab.Screen name="통신목록" component={QuestionList} />
        <Tab.Screen name=" " component={Main} />
        <Tab.Screen name="우주편지" component={Letter} />
        <Tab.Screen name="MY우주" component={MyPage} />
      </Tab.Navigator>

      <StatusBar style="light" />
    </>
  );
}

export default function Home() {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId, space, spaceId } = storedCredentials;

  useEffect(() => {
    axios.put(`${URL}/space/attend/${userId}`, { code: space }).then((res) => {
      setStoredCredentials({ name, email, photoUrl, userId, space, spaceId: res.data });
    });
  }, []);

  const renderContent = () => (
    <>
      <View
        style={{
          backgroundColor: "white",
          paddingBottom: 30,
          zIndex: 100,
        }}
      ></View>
      <View style={{ backgroundColor: "white", padding: 10, opacity: 0.5 }}></View>
    </>
  );

  const sheetRef = React.useRef(null);

  return (
    <>
      <MyTabs />
    </>
  );
}
