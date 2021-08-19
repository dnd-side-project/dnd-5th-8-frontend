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

export default function FinishInputCode(props) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId, space } = storedCredentials;
  let count = props.route.params.userCount - 1;

  const handleJoin = () => {
    const credentials = { email, name, photoUrl, userId, space: props.route.params.spaceCode };

    AsyncStorage.setItem("EightCredentials", JSON.stringify(credentials))
      .then(() => {
        setStoredCredentials(credentials);
      })
      .catch((err) => alert(`스페이스 생성 오류 : ${err}`));
  };

  return (
    <LinearGradient
      colors={["#EAF3FE", "rgba(239, 235, 255, 0.03625)"]}
      start={{ x: 1, y: 1 }}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <MainTitle>
        {props.route.params.roomMaster}님의{"\n"}가족이 맞나요?
      </MainTitle>
      <View
        style={{
          width: "90%",
          alignItems: "center",

          borderWidth: 2,
          borderColor: "white",
          borderRadius: 8,

          backgroundColor: "#ffffff",
          shadowColor: "gray",
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

        <Text style={{ fontSize: 23, marginTop: 15, marginBottom: 10 }}>{props.route.params.spaceName} 스페이스</Text>

        {count ? (
          <Text style={{ fontSize: 17, marginBottom: 90, color: "gray" }}>
            {props.route.params.roomMaster}님 외 {count}참가 중
          </Text>
        ) : (
          <Text style={{ fontSize: 17, marginBottom: 90, color: "gray" }}>{props.route.params.roomMaster}님 참가 중</Text>
        )}

        <TouchableOpacity onPress={handleJoin} style={{ width: "100%", alignItems: "center" }}>
          <LinearGradient
            colors={["#8743FF", "#4136F1"]}
            start={{ x: 1, y: 0 }}
            style={{
              width: "90%",
              height: 50,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "white",
              }}
            >
              우리 가족이 맞아요!
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ padding: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: "500", color: "gray" }}>이전 화면으로</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" />
    </LinearGradient>
  );
}
