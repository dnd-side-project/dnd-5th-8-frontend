import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Image, Platform, View, Text, Clipboard } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../components/CredentialsContext";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

import {
  MainContainer,
  MainTitle,
  MainTextInput,
  Container,
  Title,
  Label,
  Label2,
  Label3,
  SpaceButton,
} from "../components/styles";
import { LinearGradient } from "expo-linear-gradient";

const URL = "http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080";

export default function CreateSpace(props) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId, space } = storedCredentials;

  const copyToClipboard = () => {
    Clipboard.setString(props.spaceCode);
  };

  const handleFinish = () => {
    setStoredCredentials({ name, email, photoUrl, userId, space: true });
  };

  return (
    <LinearGradient
      colors={["#EAF3FE", "rgba(239, 235, 255, 0.03625)"]}
      start={{ x: 0, y: 1 }}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <MainTitle>스페이스 생성 완료!{"\n"}코드로 가족들을 초대해주세요.</MainTitle>

      <View
        style={{
          width: "90%",
          alignItems: "center",

          borderWidth: 2,
          borderColor: "white",
          borderRadius: 8,

          backgroundColor: "#ffffff",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,

          paddingTop: 30,
          paddingBottom: 20,
          marginBottom: 100,
        }}
      >
        <Image source={require("../assets/space-icon.png")} style={{ padding: 10 }} />
        <Text style={{ fontSize: 23, marginTop: 15, marginBottom: 50 }}>{props.route.params.name} 스페이스</Text>
        <Text style={{ fontSize: 45, fontWeight: "400", marginBottom: 70 }}>{props.route.params.code}</Text>
        <TouchableOpacity
          onPress={() => {
            copyToClipboard();
          }}
          style={{
            width: "90%",
            padding: 15,
            borderRadius: 8,
            borderWidth: "1",
            borderStyle: "solid",
            borderColor: "#8743ff",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", textAlign: "center", color: "#8743ff" }}>코드 복사</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleFinish} style={{ width: "100%", alignItems: "center", position: "absolute", bottom: 50 }}>
        <LinearGradient
          colors={["#8743FF", "#4136F1"]}
          start={{ x: 1, y: 0 }}
          style={{
            width: "90%",
            height: 55,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Label3>완료</Label3>
        </LinearGradient>
      </TouchableOpacity>

      <StatusBar style="dark" />
    </LinearGradient>
  );
}

function FinishCreateSpace(props) {}
