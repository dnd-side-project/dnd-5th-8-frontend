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

export default function JoinSpace({ navigation }) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId, space } = storedCredentials;

  const [spaceCode, setSpaceCode] = useState("");

  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (spaceCode.trim().length !== 0) {
      setReset(true);
    } else {
      setReset(false);
    }
  }, [spaceCode]);

  const handleDeleteText = () => {
    setSpaceCode("");
  };

  const handleJoin = () => {
    axios
      .get(`${URL}/space/attend/${spaceCode}`)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        if (res.data.isExist === true) {
          navigation.navigate("FinishInputCode", {
            spaceName: res.data.spaceName,
            userCount: res.data.userCount,
            roomMaster: res.data.roomMaster,
            family: res.data.family,
            spaceCode: spaceCode,
          });
        } else {
          alert("스페이스가 존재하지 않습니다.");
        }
      })
      .catch((err) => alert(`스페이스 참가 에러${err}`));
  };

  return (
    <MainContainer>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", top: 80, right: 20 }}>
        <Text style={{ fontSize: 18, color: "gray" }}>뒤로 가기</Text>
      </TouchableOpacity>

      <MainTitle>가족이 알려준{"\n"}초대 코드를 입력해주세요.</MainTitle>

      <View style={{ flexDirection: "row", position: "relative" }}>
        <MainTextInput
          value={spaceCode}
          onChangeText={(value) => setSpaceCode(value)}
          style={{ width: "90%", top: -150 }}
          placeholder="초대 코드"
        />

        {reset ? (
          <TouchableOpacity onPress={() => handleDeleteText()}>
            <Image source={require("../assets/close.png")} style={{ position: "absolute", padding: 10, top: -130, right: 5 }} />
          </TouchableOpacity>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={handleJoin}
        style={{ width: "100%", alignItems: "center", position: "absolute", bottom: 50 }}
        disabled={!spaceCode}
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
          <Label3>스페이스 참가</Label3>
        </LinearGradient>
      </TouchableOpacity>

      <StatusBar style="dark" />
    </MainContainer>
  );
}
