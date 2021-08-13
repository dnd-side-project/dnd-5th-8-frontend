import React, { useState, useContext, useEffect } from "react";
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
} from "react-native";

import AppLoading from "expo-app-loading";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../components/CredentialsContext";
import axios from "axios";

import { Container, Title, Comments, Label3, SpaceButton, StyledTextInput, Container2 } from "../components/styles";

import EmojiPicker from "rn-emoji-keyboard";

export default function Letter(props) {
  const { name, email, photoUrl } = props.route.params.credentials;

  const [showSend, setShowSend] = useState(false);
  const [showReceive, setShowReceive] = useState(false);

  const [letterList, setLetterList] = useState(["편지1", "편지2"]);

  useEffect(() => {
    // axios
    //   .get("URL")
    //   .then((res) => {
    //     setLetterList([...letterList, res]);
    //   })
    //   .catch((err) => alert(err));
  });

  const sendLetter = () => {};

  return (
    <Container>
      <Title>편지함</Title>
      {showSend || showReceive ? null : (
        <Container>
          <Button title="뒤로 가기" onPress={props.navigation.goBack} />
          <TouchableOpacity onPress={() => setShowSend(true)}>
            <Label3>ㅇㅇㅇ</Label3>
          </TouchableOpacity>
        </Container>
      )}
      {showSend ? <SendPage setShow={setShowSend} /> : null}
      {/* {showReceive ? <ReceivePage /> : null} */}
    </Container>
  );
}

function SendPage(props) {
  const [content, setContent] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (content.trim().length !== 0) {
      setValid(true);
    } else setValid(false);
  }, [content]);
  return (
    <Container>
      <Label3>{}에게</Label3>
      <View style={{ height: "50%", width: "90%" }}>
        <StyledTextInput
          multiline={true}
          numberOfLines={5}
          value={content}
          onChangeText={(value) => {
            setContent(value);
          }}
          placeholder="편지에 마음을 담아보세요."
        />
      </View>
      {valid ? (
        <TouchableOpacity disabled={!content}>
          <Label3>보내기 가능</Label3>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity disabled={!content}>
          <Label3>보내기 불가</Label3>
        </TouchableOpacity>
      )}

      <Button title="뒤로 가기" onPress={props.setShow(false)} />
    </Container>
  );
}
