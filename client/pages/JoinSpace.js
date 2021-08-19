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

export default function Join({ navigation }) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId } = storedCredentials;

  const [spaceName, setSpaceName] = useState("");
  const [spaceCode, setSpaceCode] = useState("");
  const [userCount, setUserCount] = useState(0);

  const [finished, setFinished] = useState(false);
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
        console.log(JSON.stringify(res));
        if (res.data.isExist === true) {
          setSpaceName(res.data.spaceName);
          setUserCount(res.data.userCount);
          setFinished(true);
        } else {
          alert("스페이스가 존재하지 않습니다.");
        }
      })
      .catch((err) => alert(`스페이스 참가 에러${err}`));
  };

  return (
    <>
      {finished ? (
        <FinishInputCode name={name} spaceName={spaceName} code={spaceCode} count={userCount} navigation={navigation} />
      ) : (
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
                <Image
                  source={require("../assets/close.png")}
                  style={{ position: "absolute", padding: 10, top: -130, right: 5 }}
                />
              </TouchableOpacity>
            ) : null}
          </View>

          <TouchableOpacity
            onPress={handleJoin}
            style={{ width: "100%", alignItems: "center", position: "absolute", bottom: 50 }}
            disabled={!spaceCode}
          >
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
              <Label3>스페이스 참가</Label3>
            </LinearGradient>
          </TouchableOpacity>

          <StatusBar style="dark" />
        </MainContainer>
      )}
    </>
  );
}
function FinishInputCode(props) {
  let count = props.count - 1;

  const copyToClipboard = () => {
    Clipboard.setString(props.spaceCode);
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
      <MainTitle>
        {props.name}님의{"\n"}가족이 맞나요?
      </MainTitle>
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

        <Text style={{ fontSize: 23, marginTop: 15, marginBottom: 10 }}>{props.spaceName} 스페이스</Text>

        {count ? (
          <Text style={{ fontSize: 17, marginBottom: 90, color: "gray" }}>
            {props.name}님 외 {count}참가 중
          </Text>
        ) : (
          <Text style={{ fontSize: 17, marginBottom: 90, color: "gray" }}>{props.name}님 참가 중</Text>
        )}

        <TouchableOpacity style={{ width: "100%", alignItems: "center" }}>
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
                fontWeight: "6 00",
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
