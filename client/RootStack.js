import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { CredentialsContext } from "./components/CredentialsContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Space from "./pages/Space";
import CreateSpace from "./pages/CreateSpace";

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
                <Stack.Screen name="Home" component={Home} />
              ) : (
                <Stack.Screen name="Login" component={Login} />
              )}
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Space" component={Space} />
              <Stack.Screen name="CreateSpace" component={CreateSpace} />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </CredentialsContext.Consumer>
      <StatusBar style="light" />
    </>
  );
}
