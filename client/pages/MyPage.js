import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Image, Text, View, Clipboard, Button, Switch } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CredentialsContext } from "../components/CredentialsContext";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import {
  MainContainer,
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
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import Toast, { DURATION } from "react-native-easy-toast";
import { Snackbar } from "react-native-paper";

const URL = "http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080";

export default function MyPage(props) {
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
    <MainContainer>
      <View
        style={{
          width: "100%",
          height: "13%",
          borderRadius: 8,
          position: "absolute",
          top: -20,
          backgroundColor: "#170C59",
        }}
      >
        <Text style={{ color: "white", fontSize: 23, fontWeight: "700", textAlign: "center", top: 77 }}>MY</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("EditProfile");
        }}
        style={{ position: "absolute", top: 130, right: 17, zIndex: 1 }}
      >
        <View style={{ backgroundColor: "#F2F4F8", borderRadius: 25, padding: 10 }}>
          <Image source={require("../assets/write.png")} style={{ padding: 10 }} />
        </View>
      </TouchableOpacity>

      <View style={{ position: "absolute", top: 130, alignItems: "center" }}>
        <Avatar resizeMode="cover" source={AvatarImg} style={{ width: 130, height: 130 }} />
        <Text style={{ fontSize: 27, fontWeight: "600", marginVertical: 10 }}>{name || "Default Name"}</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("CodeLink");
        }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#F2F4F8",
          width: "90%",
          borderRadius: 8,
          padding: 17,
          marginTop: 70,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 15 }}>코드 복사로 가족들을 초대해주세요!</Text>
        <Image source={require("../assets/copy-arrow.png")} style={{ alignSelf: "center" }} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("NotificationSetting");
        }}
        style={{
          width: "90%",
          padding: 20,
          marginVertical: 10,

          borderBottomWidth: 2,
          borderBottomColor: "#F2F4F8",
        }}
      >
        <Text style={{ fontSize: 20 }}>알림 설정</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => clearLogin()}
        style={{
          width: "90%",
          padding: 20,
          marginVertical: 10,
          marginBottom: 70,
          borderBottomWidth: 2,
          borderBottomColor: "#F2F4F8",
        }}
      >
        <Text style={{ fontSize: 20, color: "red" }}>로그아웃</Text>
      </TouchableOpacity>

      <StatusBar style="light" />
    </MainContainer>
  );
}
