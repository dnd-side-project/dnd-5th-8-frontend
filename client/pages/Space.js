import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Image, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../components/CredentialsContext";
import axios from "axios";

import { Container, Title, Label, Label2, Label3, SpaceButton } from "../components/styles";
import { LinearGradient } from "expo-linear-gradient";

export default function Space({ navigation }) {
  return (
    <Container>
      <StatusBar style="light" />
      <Title>스페이스 페이지</Title>
      <SpaceButton style={{ marginBottom: 30 }}>
        <LinearGradient
          colors={["#8743FF", "#4136F1"]}
          start={{ x: 0.0, y: 1 }}
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
      <SpaceButton>
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
          <Label3 style={{ color: "#611DF2" }}>스페이스 참가하기</Label3>
        </LinearGradient>
      </SpaceButton>
    </Container>
  );
}
