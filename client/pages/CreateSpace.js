import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Image, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../components/CredentialsContext";
import axios from "axios";

import { Container, Title2, Label, Label2, Label3, SpaceButton, StyledTextInput } from "../components/styles";

export default function CreateSpace({ navigation }) {
  const [spaceName, setSpaceName] = useState("");
  const [valid, setValid] = useState(false);

  const checkValid = (text) => {
    if (text.trim().length === 0) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  return (
    <Container>
      <StatusBar style="light" />
      <Title2>스페이스의 이름을 정해주세요.</Title2>
      <StyledTextInput
        value={spaceName}
        onChangeText={(value) => {
          setSpaceName(value);
          setValid(value);
        }}
      />
      {valid ? <Label3>유효</Label3> : <Label3>무효</Label3>}
    </Container>
  );
}
