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

export default function CreateSpace({ navigation }) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId, space } = storedCredentials;
  const [spaceName, setSpaceName] = useState("");

  const [finished, setFinished] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (spaceName.trim().length !== 0) {
      setReset(true);
    } else {
      setReset(false);
    }
  }, [spaceName]);

  const handleDeleteText = () => {
    setSpaceName("");
  };

  const handleCreate = () => {
    const body = {
      id: userId,
      name: spaceName,
    };

    axios
      .post(`${URL}/space/create`, body)
      .then((res) => {
        navigation.navigate("FinishCreateSpace", { name: spaceName, code: res.data });
      })
      .catch((err) => {
        alert(`스페이스 생성 에러${err}`);
      });
  };

  return (
    <MainContainer>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", top: 80, right: 20 }}>
        <Text style={{ fontSize: 18, color: "gray" }}>뒤로 가기</Text>
      </TouchableOpacity>

      <MainTitle>스페이스의{"\n"}이름을 정해주세요.</MainTitle>

      <View style={{ flexDirection: "row", position: "relative" }}>
        <MainTextInput
          value={spaceName}
          onChangeText={(value) => setSpaceName(value)}
          style={{ width: "90%", top: -150 }}
          placeholder="스페이스 이름"
        />
        {reset ? (
          <TouchableOpacity onPress={() => handleDeleteText()}>
            <Image source={require("../assets/close.png")} style={{ position: "absolute", padding: 10, top: -130, right: 5 }} />
          </TouchableOpacity>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={handleCreate}
        style={{ width: "100%", alignItems: "center", position: "absolute", bottom: 50 }}
        disabled={!spaceName}
      >
        <LinearGradient
          colors={["#3C0CE3", "#3C0CE3"]}
          style={{
            width: "90%",
            height: 55,
            borderRadius: 8,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Label3>스페이스 생성</Label3>
        </LinearGradient>
      </TouchableOpacity>

      <StatusBar style="dark" />
    </MainContainer>
  );
}
