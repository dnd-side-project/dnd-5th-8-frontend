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
  const { name, email, photoUrl, userId } = storedCredentials;
  const [spaceName, setSpaceName] = useState("");
  const [spaceCode, setSpaceCode] = useState("");

  const [finished, setFinished] = useState(false);

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
        setSpaceCode(res.data);
        setFinished(true);
      })
      .catch((err) => alert(`스페이스 생성 에러${err}`));
  };

  return (
    <>
      {finished ? (
        <FinishInputCode name={spaceName} code={spaceCode} />
      ) : (
        <MainContainer>
          <MainTitle>스페이스의{"\n"}이름을 정해주세요.</MainTitle>

          <View style={{ flexDirection: "row", position: "relative" }}>
            <MainTextInput
              value={spaceName}
              onChangeText={(value) => setSpaceName(value)}
              style={{ width: "90%", top: -150 }}
              placeholder="스페이스 이름"
            />
            <TouchableOpacity onPress={() => handleDeleteText()}>
              <Image source={require("../assets/close.png")} style={{ position: "absolute", padding: 10, top: -130, right: 5 }} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleCreate}
            style={{ width: "100%", alignItems: "center", position: "absolute", bottom: 50 }}
            disabled={!spaceName}
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
              <Label3>스페이스 생성</Label3>
            </LinearGradient>
          </TouchableOpacity>

          <StatusBar style="dark" />
        </MainContainer>
      )}
    </>
  );
}

function FinishInputCode(props) {
  const copyToClipboard = () => {
    Clipboard.setString(props.spaceCode);
  };

  return (
    <MainContainer>
      <MainTitle>스페이스 생성 완료!{"\n"}코드로 가족들을 초대해주세요.</MainTitle>

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
        <Text style={{ fontSize: 30, marginBottom: 50 }}>{props.name}</Text>
        <Text style={{ fontSize: 50, fontWeight: "450", marginBottom: 70 }}>{props.code}</Text>
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

      <TouchableOpacity style={{ width: "100%", alignItems: "center", position: "absolute", bottom: 50 }}>
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
          <Label3>완료</Label3>
        </LinearGradient>
      </TouchableOpacity>

      <StatusBar style="dark" />
    </MainContainer>
  );
}
