import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Constants from "expo-constants";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ title: "로그인 페이지" }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: "프로필 페이지" }} />
        <Stack.Screen name="Home" component={Home} options={{ title: "홈" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
