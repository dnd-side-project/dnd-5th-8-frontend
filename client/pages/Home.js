import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";

import Container from "../components/Container";

import styled from "styled-components";

// Async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// credentials context
import { CredentialsContext } from "../components/CredentialsContext";

const Title = styled.Text`
  position: absolute;
  top: 200px;
  color: #d5aaff;
  font-size: 100px;
  font-weight: bold;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
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

const LogOutButton = styled.TouchableOpacity`
  width: 297px;
  height: 45px;

  background: #fae100;
  border-radius: 80px;

  justify-content: center;
  align-items: center;

  margin-top: 100px;
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

  return (
    <Container>
      <StatusBar style="light" />
      <Title>홈 페이지</Title>
      <Avatar resizeMode="cover" source={AvatarImg} />
      <Label welcome={true}>{name || "Default Name"}</Label>
      <Label welcome={true}>{email || "Defalt Email"}</Label>
      <LogOutButton onPress={clearLogin}>
        <Label>Logout</Label>
      </LogOutButton>
    </Container>
  );
}
