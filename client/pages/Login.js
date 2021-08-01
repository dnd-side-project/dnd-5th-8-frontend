import React, { useState } from "react";
import { Text } from "react-native";
import { WebView } from "react-native-webview";

import Container from "../components/Container";
import Contents from "../components/Contents";
import Button from "../components/Button";
import SocialWebviewModal from "../pages/SocialWebviewModal";

import styled from "styled-components";

import * as Linking from "expo-linking";

import axios from "axios";

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
  return (
    <Container>
      <Title>에잇</Title>
      <KakaoLoginButton>
        <Label>카카오톡으로 로그인</Label>
      </KakaoLoginButton>
      <GoogleLoginButton
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <Label>구글로 로그인</Label>
      </GoogleLoginButton>
      <SignUp>
        <Label style={{ color: "#ff9c78", textDecorationLine: "underline" }}>이메일로 회원가입</Label>
      </SignUp>
    </Container>
  );
}
