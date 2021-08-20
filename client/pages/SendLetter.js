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
  Avatar,
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

export default function SendLetter({ navigation }) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId, space, spaceId } = storedCredentials;

  const [toId, setToId] = useState();
  const [toName, setToName] = useState("");
  const [fromId, setFromId] = useState(userId);
  const [content, setContent] = useState("");
  const [family, setFamily] = useState([]);

  const [token, setToken] = useState("");

  useEffect(() => {
    axios
      .get(`${URL}/space/attend/${space}`)
      .then((res) => setFamily(res.data.family))
      .catch((err) => alert(`가족 리스트를 받아오지 못했습니다 : ${err}`));
  }, []);

  const handleSelectTo = (x) => {
    setToId(x.userId);
    setToName(x.nickname);
  };

  const handleSendLetter = () => {
    const body = {
      touserId: toId,
      fromuserId: fromId,
      content: content,
    };

    axios
      .post(`${URL}/letter`, body)
      .then((res) => {
        alert("편지 전송 완료");
        setToken(res.data);
      })
      .catch((err) => alert("편지를 보내지 못했습니다."));
  };

  return (
    <MainContainer style={{ paddingBottom: 190 }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", top: 80, right: 30, zIndex: 1 }}>
        <Image source={require("../assets/back.png")} style={{ padding: 10 }} />
      </TouchableOpacity>

      <FlatList
        style={{ width: Width, position: "absolute", top: 80, left: 30 }}
        horizontal={true}
        data={family}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectTo(item)} style={{ marginRight: 20 }}>
            <Avatar resizeMode="cover" source={{ uri: item.profile }} style={{ width: 60, height: 60 }} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.touserId}
      />

      <View style={{ flexDirection: "row", width: Width }}>
        <Text style={{ fontSize: 23, marginBottom: 20, marginLeft: 20, left: 15, color: "#611DF2" }}>{toName}</Text>
        <Text style={{ fontSize: 23, marginBottom: 20, marginLeft: 15 }}>에게</Text>
      </View>
      <TextInput
        multiline={true}
        numberOfLines={100}
        value={content}
        onChangeText={(value) => setContent(value)}
        style={{
          width: "90%",
          height: "35%",
          fontSize: 23,
          borderWidth: 1,
          borderColor: "#BFC3CF",
          borderRadius: 8,
          padding: 20,
          paddingTop: 15,
        }}
      />

      <TouchableOpacity onPress={handleSendLetter} style={{ width: "100%", alignItems: "center" }} disabled={!content}>
        <LinearGradient
          colors={["#3C0CE3", "#3C0CE3"]}
          style={{
            width: "90%",
            height: 55,
            borderRadius: 8,

            justifyContent: "center",
            alignItems: "center",

            marginTop: 25,
          }}
        >
          <Label3>편지 보내기</Label3>
        </LinearGradient>
      </TouchableOpacity>
    </MainContainer>
  );
}
