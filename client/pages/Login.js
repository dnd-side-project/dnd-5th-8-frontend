import React, { useState, useContext } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container, Title, GoogleLoginButton, SignUp, Label2 } from "../components/styles";
import { CredentialsContext } from "../components/CredentialsContext";

import * as Google from "expo-google-app-auth";
import { CLIENT_ID_IOS, CLIENT_ID_ANDROID } from "@env";

export default function Login({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const handleMessage = (message, type = "") => {
    setMessage(message);
    setMessageType(type);
  };

  const handleGoogleSignin = () => {
    setGoogleSubmitting(true);
    const config = {
      iosClientId: CLIENT_ID_IOS,
      android: CLIENT_ID_ANDROID,
      scopes: ["profile", "email"],
    };

    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type == "success") {
          const { email, name, photoUrl } = user;
          persistLogin({ email, name, photoUrl }, "Google signin successful", "SUCCESS");
        } else {
          handleMessage("Google Signin was cancelled");
        }
        setGoogleSubmitting(false);
        alert("로그인 성공!");
      })
      .catch((error) => {
        handleMessage("An error occurred. Check your network and try again");
        console.log(error);
        setGoogleSubmitting(false);
      });
  };

  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem("EightCredentials", JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        handleMessage("Persisting login failed");
        console.log(error);
      });
  };

  return (
    <Container>
      <Title>에잇</Title>
      {!googleSubmitting && (
        <GoogleLoginButton onPress={handleGoogleSignin} google={true}>
          <Label2 google={true}>구글 계정으로 로그인</Label2>
        </GoogleLoginButton>
      )}
      {googleSubmitting && (
        <GoogleLoginButton disabled={true} google={true}>
          <ActivityIndicator size="large" color={"#8743FF"} />
        </GoogleLoginButton>
      )}

      <SignUp>
        <Label2 style={{ color: "#ff9c78", textDecorationLine: "underline" }}>이메일로 회원가입</Label2>
      </SignUp>
    </Container>
  );
}
