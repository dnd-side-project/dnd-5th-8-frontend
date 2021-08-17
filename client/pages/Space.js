import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Image, Platform, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../components/CredentialsContext";
import axios from "axios";

import { MainContainer, MainTitle, Container, Title, Label, Label2, Label3, SpaceButton } from "../components/styles";
import { LinearGradient } from "expo-linear-gradient";

export default function Space({ navigation }) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  console.log("스페이스에서..", storedCredentials);

  return (
    <MainContainer>
      <MainTitle>이제 가족들을{"\n"}만나러 가볼까요?</MainTitle>

      <SpaceButton onPress={() => navigation.navigate("CreateSpace")} style={{ marginBottom: 30 }}>
        <LinearGradient
          colors={["#8743FF", "#4136F1"]}
          start={{ x: 1, y: 0 }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Label3>스페이스 만들기</Label3>
        </LinearGradient>
      </SpaceButton>

      <SpaceButton
        onPress={() => navigation.navigate("JoinSpace")}
        style={{
          borderWidth: "2",
          borderStyle: "solid",
          borderColor: "#8743ff",
        }}
      >
        <LinearGradient
          colors={["#ffffff", "#ffffff"]}
          start={{ x: 0.0, y: 1 }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#611DF2", fontSize: 17 }}>초대코드를 받았어요!</Text>
          <Label3 style={{ color: "#611DF2", margin: 7 }}>스페이스 참가하기</Label3>
        </LinearGradient>
      </SpaceButton>

      <SpaceButton
        style={{ position: "absolute", bottom: 100 }}
        onPress={() => {
          navigation.navigate("Letter", { credentials: storedCredentials });
        }}
      >
        <Text style={{ fontSize: 50 }}>편지함</Text>
      </SpaceButton>

      <StatusBar style="dark" />
    </MainContainer>
  );
}
