import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Image, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../components/CredentialsContext";
import axios from "axios";

import {
  Container,
  SpaceButton,
  StyledTextInput,
  Title,
  Label,
  Label2,
  Label3,
  Avatar,
  TestButton,
  LogOutButton,
} from "../components/styles";

import { LinearGradient } from "expo-linear-gradient";

export default function Home({ navigation }) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId } = storedCredentials;

  return (
    <Container>
      <Title>홈 페이지</Title>
      <TestButton
        onPress={() => {
          navigation.navigate("QuestionList");
        }}
      >
        <Label2>통신 목록</Label2>
      </TestButton>

      <TestButton
        onPress={() => {
          navigation.navigate("MyPage");
        }}
      >
        <Label2>마이 페이지</Label2>
      </TestButton>

      <TestButton
        onPress={() => {
          navigation.navigate("NotificationTest");
        }}
      >
        <Label2>알람 테스트</Label2>
      </TestButton>

      <TestButton
        onPress={() => {
          navigation.navigate("Letter", { credentials: storedCredentials });
        }}
      >
        <Label2>편지함</Label2>
      </TestButton>

      <TestButton
        onPress={() => {
          navigation.navigate("CreateSpace", { credentials: storedCredentials });
        }}
      >
        <Label2>스페이스 생성</Label2>
      </TestButton>

      <TestButton
        onPress={() => {
          navigation.navigate("Comment", { credentials: storedCredentials });
        }}
      >
        <Label2>댓글 페이지</Label2>
      </TestButton>

      <StatusBar style="light" />
    </Container>
  );
}
