import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Image, Text, View, Clipboard, Button, Switch } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CredentialsContext } from "../components/CredentialsContext";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import {
  MainContainer,
  MainTextInput,
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

export default function CodeLink(props) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId, space } = storedCredentials;
  const [spaceName, setSpaceName] = useState("");

  useEffect(() => {
    axios.get(`${URL}/space/attend/${space}`).then((res) => setSpaceName(res.data.spaceName));
  }, []);

  const copyToClipboard = () => {
    Clipboard.setString(space);
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
          zIndex: 1,
        }}
      >
        <Text style={{ color: "white", fontSize: 23, fontWeight: "700", textAlign: "center", top: 77 }}>가족 코드</Text>

        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ position: "absolute", top: 80, left: 30 }}>
          <Image source={require("../assets/back-arrow.png")} />
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={["#EAF3FE", "rgba(239, 235, 255, 0.03625)"]}
        start={{ x: 0, y: 0 }}
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
            top: -100,
          }}
        >
          <Image source={require("../assets/space-icon.png")} style={{ padding: 10 }} />
          <Text style={{ fontSize: 23, fontWeight: "400", marginTop: 15, marginBottom: 50 }}>{spaceName} 스페이스</Text>
          <Text style={{ fontSize: 45, fontWeight: "500", marginBottom: 70 }}>{space}</Text>
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
      </LinearGradient>
      <StatusBar style="light" />
    </MainContainer>
  );
}
