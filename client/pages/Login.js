import React, { useState, useContext, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container, Title, GoogleLoginButton, SignUp, Label2, MsgBox } from "../components/styles";
import { CredentialsContext } from "../components/CredentialsContext";

import * as Google from "expo-google-app-auth";
import { CLIENT_ID_IOS, CLIENT_ID_ANDROID } from "@env";

import axios from "axios";

export default function Login() {
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  //const [userId, setUserId] = useState();

  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const handleMessage = (message, type = "") => {
    setMessage(message);
    setMessageType(type);
  };

  const [id, setId] = useState(100);

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
              persistLogin({ email, name, photoUrl, userId }, "구글 로그인 성공", "SUCCESS");
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
      <Title>에잇</Title>
      {!googleSubmitting && (
        <GoogleLoginButton onPress={handleGoogleSignin}>
          <Label2>구글 계정으로 로그인</Label2>
        </GoogleLoginButton>
      )}
      {googleSubmitting && (
        <GoogleLoginButton disabled={true}>
          <ActivityIndicator size="large" color={"#8743FF"} />
        </GoogleLoginButton>
      )}

      <SignUp>
        <Label2 style={{ color: "#ff9c78", textDecorationLine: "underline" }}>이메일로 회원가입</Label2>
      </SignUp>

      <MsgBox type={messageType}>{message}</MsgBox>
    </Container>
  );
}
