import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Image, Platform, View, Text } from "react-native";
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
import { TextInput } from "react-native-gesture-handler";

const URL = "http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080";

export default function Main({ navigation }) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId, space } = storedCredentials;
  const [spaceName, setSpaceName] = useState("");

  useEffect(() => {
    axios.get(`${URL}/space/attend/${space}`).then((res) => {
      setSpaceName(res.data.spaceName);
    });
  }, []);

  return (
    <Container>
      <Image source={require("../assets/main.png")} style={{ position: "absolute", height: "100%", zIndex: -1 }} />

      <Text style={{ color: "white", fontSize: 27, fontWeight: "500", position: "absolute", top: 70, left: 30 }}>
        {spaceName}
      </Text>

      <View
        style={{
          padding: 220,
          borderRadius: 1000,
          backgroundColor: "rgba(239, 230, 253, 0.1)",

          position: "absolute",
          bottom: -150,
        }}
      ></View>
    </Container>
  );
}
