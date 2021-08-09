import React, { useState } from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

import Container from "../components/Container";
import Contents from "../components/Contents";
import Button from "../components/Button";

import styled from "styled-components";

import * as DocumentPicker from "expo-document-picker";

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
  const [doc, setDoc] = useState();

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then((response) => {
      if (response.type == "success") {
        let { name, size, uri } = response;
        let nameParts = name.split(".");
        let fileType = nameParts[nameParts.length - 1];
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType,
        };
        console.log(fileToUpload, "...............file");
        setDoc(fileToUpload);
      }
    });
    // console.log(result);
    console.log("Doc: " + doc.uri);
  };

  const postDocument = () => {
    const fileUri = doc.uri;
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    const formData = new FormData();
    formData.append("nickname", "에잇2");
    formData.append("email", "test@email.com");
    formData.append("profile", doc);

    console.log(formData);

    axios
      .put("http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080/user", formData, config)
      .then((res) => {
        console.log("요청 성공");
        console.log(JSON.stringify(res));
      })
      .catch((err) => console.log("요청 에러"));
  };

  return (
    <Container style={{ flexDirection: "row", position: "absoulte" }}>
      <Title>프로필 페이지</Title>
      <Input placeholder={"입력해주세요."} value={name} onChangeText={(value) => setName(value)} />
      <TouchableOpacity style={styles.closeButtonParent} onPress={() => setName("")}>
        <Image style={styles.closeButton} source={require("../assets/close.png")} />
      </TouchableOpacity>
      <Button title="Select Document" onPress={pickDocument} />
      <Button title="Upload" onPress={postDocument} />
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
