import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";

import Container from "../components/Container";

import styled from "styled-components";

// Async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// credentials context
import { CredentialsContext } from "../components/CredentialsContext";
import axios from "axios";

const Title = styled.Text`
  position: absolute;
  top: 70px;
  color: #d5aaff;
  font-size: 100px;
  font-weight: bold;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
`;
const Label2 = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
`;

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50px;
  border-width: 2px;
  border-color: #e5e7eb;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const TestButton = styled.TouchableOpacity`
  width: 297px;
  height: 45px;

  background: #fae100;
  border-radius: 80px;

  justify-content: center;
  align-items: center;

  margin-top: 100px;
`;

const LogOutButton = styled.TouchableOpacity`
  width: 297px;
  height: 45px;

  background: #fae100;
  border-radius: 80px;

  justify-content: center;
  align-items: center;

  margin-top: 30px;
`;

export default function Home() {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl } = storedCredentials;
  const AvatarImg = photoUrl
    ? {
        uri: photoUrl,
      }
    : require("../assets/sample.jpeg");

  const clearLogin = () => {
    AsyncStorage.removeItem("EightCredentials")
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  const testRequest = () => {
    const data = {
      nickname: name,
      email: email,
      profile: photoUrl,
    };
    axios
      .post("http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080/user", data)
      .then((res) => alert(res))
      .catch((err) => alert("에러"));
  };

  return (
    <Container>
      <StatusBar style="light" />
      <Title>홈 페이지</Title>
      <Avatar resizeMode="cover" source={AvatarImg} />
      <Label welcome={true}>{name || "Default Name"}</Label>
      <Label welcome={true}>{email || "Defalt Email"}</Label>
      <TestButton onPress={testRequest}>
        <Label2>요청테스트</Label2>
      </TestButton>
      <LogOutButton onPress={clearLogin}>
        <Label2>Logout</Label2>
      </LogOutButton>
    </Container>
  );
}
