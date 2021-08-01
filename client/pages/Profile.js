import React, { useState } from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

import Container from "../components/Container";
import Contents from "../components/Contents";
import Button from "../components/Button";

import styled from "styled-components";

const Title = styled.Text`
  position: absolute;
  top: 200px;
  font-size: 70px;
  font-weight: bold;
  color: #d5aaff;
`;

const Input = styled.TextInput`
  padding: 10px;
  margin-bottom: 10px;
  font-size: 20px;

  color: white;

  width:50%
  border-bottom-width: 1;
  border-color: white;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
`;

export default function Login({ navigation }) {
  const [name, setName] = useState("");
  return (
    <Container style={{ flexDirection: "row", position: "absoulte" }}>
      <Title>프로필 페이지</Title>
      <Input placeholder={"입력해주세요."} value={name} onChangeText={(value) => setName(value)} />
      <TouchableOpacity style={styles.closeButtonParent} onPress={() => setName("")}>
        <Image style={styles.closeButton} source={require("../assets/close.png")} />
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    height: 25,
    width: 25,
    borderRadius: 25,
  },
  closeButtonParent: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    position: "relative",
  },
});
