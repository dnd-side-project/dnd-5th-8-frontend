import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Button,
  TouchableOpacity,
  FlatList,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  Keyboard,
  Dimensions,
  TextInput,
  SafeAreaView,
} from "react-native";

import { CredentialsContext } from "../components/CredentialsContext";
import axios from "axios";
import {
  MainContainer,
  Title,
  Comments,
  Label3,
  SpaceButton,
  StyledTextInput,
  Container2,
  MainTextInput,
} from "../components/styles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LinearGradient } from "expo-linear-gradient";

import styled from "styled-components";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const NewLetterBox = styled.View`
  background: black;
  width: 90%;
  height: 270;
  border-radius: 8;
`;

const URL = "http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080";

export default function DetailLetter({ navigation }) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId } = storedCredentials;

  const [toId, setToId] = useState(9);
  const [fromId, setFromId] = useState(userId);
  const [content, setContent] = useState("");

  const handleSendLetter = () => {
    const body = {
      touserId: toId,
      fromuserId: fromId,
      content: content,
    };

    axios
      .post(`${URL}/letter`, body)
      .then((res) => alert(JSON.stringify(res)))
      .catch((err) => alert(err));
  };

  return (
    <MainContainer>
      <Text style={{ fontSize: "23", fontWeight: "600", marginBottom: 30, marginLeft: 20, alignSelf: "start" }}>
        {}이 보낸 편지
      </Text>

      <View
        style={{
          width: "90%",
          height: "35%",

          borderWidth: 1,
          borderColor: "#7F48F5",
          borderRadius: 8,
          padding: 20,
          paddingTop: 15,
        }}
      >
        <Text style={{ fontSize: 20 }}>에잇 짱짱</Text>
      </View>

      <TouchableOpacity onPress={handleSendLetter} style={{ width: "100%", alignItems: "center" }} disabled={!content}>
        <View
          style={{
            width: "90%",
            height: 55,
            borderWidth: 1,
            borderColor: "#7F48F5",
            borderRadius: 8,

            justifyContent: "center",
            alignItems: "center",

            marginTop: 25,
          }}
        >
          <Label3 style={{ color: "#7F48F5" }}>답장 보내기</Label3>
        </View>
      </TouchableOpacity>
      <View style={{ padding: 100 }} />
    </MainContainer>
  );
}
