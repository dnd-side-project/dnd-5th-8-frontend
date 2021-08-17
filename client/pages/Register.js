import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Image, Platform, View, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../components/CredentialsContext";
import axios from "axios";

import {
  MainContainer,
  SpaceButton,
  StyledTextInput,
  MainTitle,
  Label,
  Label2,
  Label3,
  Avatar,
  TestButton,
  LogOutButton,
  MainTextInput,
} from "../components/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { LinearGradient } from "expo-linear-gradient";

export default function Register({ navigation }) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId } = storedCredentials;

  const [text, setText] = useState("");

  const AvatarImg = photoUrl
    ? {
        uri: photoUrl,
      }
    : require("../assets/sample.jpeg");

  const handleDeleteText = () => {
    setText("");
  };

  const handleSubmit = () => {
    const credentials = {
      name: text,
      email: email,
      photoUrl: photoUrl,
      userId: userId,
    };
    setStoredCredentials(credentials);

    navigation.navigate("Space");
  };

  return (
    <MainContainer>
      <MainTitle>가족과 대화할{"\n"}내 프로필을 작성해주세요.</MainTitle>

      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <Avatar resizeMode="cover" source={AvatarImg} style={{ width: 150, height: 150 }} />
        <TouchableOpacity>
          <View
            style={{
              position: "absolute",
              left: -30,
              top: 100,
              padding: 13,
              borderRadius: 25,
              backgroundColor: "#F2F4F8",
            }}
          >
            <Image source={require("../assets/camera.png")} style={{ padding: 10, backgroundColor: "#F2F4F8" }} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
        <MainTextInput value={text} onChangeText={(value) => setText(value)} placeholder={name} style={{ width: 130 }} />
        <TouchableOpacity onPress={() => handleDeleteText()}>
          <Image source={require("../assets/close.png")} style={{ position: "absolute", padding: 10, top: 15, right: 0 }} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSubmit} style={{ width: "100%", alignItems: "center" }} disabled={!text}>
        <LinearGradient
          colors={["#8743FF", "#4136F1"]}
          start={{ x: 1, y: 0 }}
          style={{
            width: "90%",
            height: 55,
            borderRadius: 8,

            justifyContent: "center",
            alignItems: "center",

            top: 250,
          }}
        >
          <Label3>완료</Label3>
        </LinearGradient>
      </TouchableOpacity>
    </MainContainer>
  );
}
