import React, { useState, useContext, useEffect } from "react";
import { ActivityIndicator, Image, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MainTextInput, Container, Title, GoogleLoginButton, SignUp, LabelWhite, MsgBox, Label2 } from "../components/styles";
import { CredentialsContext } from "../components/CredentialsContext";
import { StatusBar } from "expo-status-bar";

import * as Google from "expo-google-app-auth";
import { CLIENT_ID_IOS, CLIENT_ID_ANDROID } from "@env";

import axios from "axios";

export default function Login() {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  const handleMessage = (message, type = "") => {
    setMessage(message);
    setMessageType(type);
  };

  const handleGoogleSignin = () => {
    setGoogleSubmitting(true);

    const config = {
      iosClientId: CLIENT_ID_IOS,
      androidClientId: CLIENT_ID_ANDROID,
      scopes: ["profile", "email"],
    };

    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;

        if (type == "success") {
          const { email, name, photoUrl } = user;
          let userId = -1;

          const data = {
            email: email,
            nickname: name,
            profile: photoUrl,
          };

          axios
            .post("http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080/user", data)
            .then((res) => {
              userId = res.data;
              let space = false;
              persistLogin({ email, name, photoUrl, userId, space }, "구글 로그인 성공", "SUCCESS");
            })
            .catch((err) => alert(err));
        } else {
          handleMessage("구글 로그인 취소");
        }
        setGoogleSubmitting(false);
      })
      .catch((error) => {
        handleMessage("ERROR");
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
        handleMessage("로그인 유지 실패");
      });
  };

  return (
    <Container>
      <Image source={require("../assets/main.png")} style={{ position: "absolute", height: "100%", zIndex: -1 }} />

      <View style={{ alignItems: "center", top: -170 }}>
        <Image source={require("../assets/logo.png")} style={{ marginBottom: 20 }} />
        <Text style={{ color: "rgba(184, 152, 248, 1)", fontSize: 23, padding: 10 }}>간편하게 로그인하고</Text>
        <Text style={{ color: "white", fontSize: 27, fontWeight: "bold" }}>우리 가족만의 대화를 나누세요!</Text>
      </View>

      {!googleSubmitting && (
        <GoogleLoginButton onPress={handleGoogleSignin} style={{ zIndex: 1 }}>
          <Image source={require("../assets/google-login.png")} style={{ padding: 10, marginRight: 15 }} />
          <LabelWhite>Google로 시작</LabelWhite>
        </GoogleLoginButton>
      )}
      {googleSubmitting && (
        <GoogleLoginButton disabled={true}>
          <ActivityIndicator size="large" color={"#8743FF"} />
        </GoogleLoginButton>
      )}

      <View
        style={{
          padding: 220,
          borderRadius: 1000,
          backgroundColor: "rgba(239, 230, 253, 0.1)",

          position: "absolute",
          bottom: -150,
        }}
      ></View>

      <MsgBox type={messageType}>{message}</MsgBox>

      <StatusBar style="light" />
    </Container>
  );
}
