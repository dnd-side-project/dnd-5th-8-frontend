import React, { useState, useContext } from "react";
import { Text, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

import Container from "../components/Container";
import Contents from "../components/Contents";
import Button from "../components/Button";

import styled from "styled-components";

import * as Linking from "expo-linking";

import * as Google from "expo-google-app-auth";
import axios from "axios";

// credentials context
import { CredentialsContext } from "../components/CredentialsContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { CLIENT_ID_IOS, CLIENT_ID_ANDROID } from "@env";

// const CLIENT_ID_IOS = "1093078017797-4h18gb8q04qkntiv9sv76afev9810bvd.apps.googleusercontent.com";
//const CLIENT_ID_ANDROID = "1093078017797-pkdo3e7ukjf8bg7pop01a0cufu8e87ih.apps.googleusercontent.com";

const Title = styled.Text`
  position: absolute;
  top: 200px;
  font-size: 100px;
  font-weight: bold;
  color: #d5aaff;
`;

const KakaoLoginButton = styled.TouchableOpacity`
  width: 297px;
  height: 45px;

  background: #fae100;
  border-radius: 80px;

  justify-content: center;
  align-items: center;

  margin-top: 100px;
`;

const GoogleLoginButton = styled.TouchableOpacity`
  width: 297px;
  height: 45px;

  background: #ffffff;
  border-radius: 80px;

  justify-content: center;
  align-items: center;

  margin-top: 20px;
`;

const SignUp = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  margin-top: 20px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
`;

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
    AsyncStorage.setItem("flowerCribCredentials", JSON.stringify(credentials))
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
          <Label google={true}>구글 계정으로 로그인</Label>
        </GoogleLoginButton>
      )}
      {googleSubmitting && (
        <GoogleLoginButton disabled={true} google={true}>
          <ActivityIndicator size="large" color={"yellow"} />
        </GoogleLoginButton>
      )}

      <SignUp>
        <Label style={{ color: "#ff9c78", textDecorationLine: "underline" }}>이메일로 회원가입</Label>
      </SignUp>
    </Container>
  );
}
