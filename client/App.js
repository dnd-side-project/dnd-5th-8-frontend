import React, { useState } from "react";
import RootStack from "./RootStack";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./components/CredentialsContext";

import { configureFonts, DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const fontConfig = {
  ios: {
    regular: {
      fontSize: "20",
    },
  },
  android: {
    regular: {
      fontSize: "20",
    },
  },
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    onSurface: "#3C0CE3",
  },
  fonts: configureFonts(fontConfig),
};

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredentials = () => {
    AsyncStorage.getItem("EightCredentials")
      .then((result) => {
        console.log("로그인체크..", result);
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((error) => alert(error));
  };

  if (!appReady) {
    return <AppLoading startAsync={checkLoginCredentials} onFinish={() => setAppReady(true)} onError={console.warn} />;
  }

  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
      <PaperProvider theme={theme}>
        <RootStack />
      </PaperProvider>
    </CredentialsContext.Provider>
  );
}
