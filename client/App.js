import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, Alert } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Constants from "expo-constants";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

import { StatusBar } from "expo-status-bar";

import { CredentialsContext } from "./components/CredentialsContext";

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
                cardStyle: { backgroundColor: "white" },
              }}
            >
              {storedCredentials ? (
                <Stack.Screen name="Home" component={Home} />
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

// <Stack.Screen name="Profile" component={Profile} options={{ title: "프로필 페이지" }} />
