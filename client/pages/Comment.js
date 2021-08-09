import React, { useState, useContext, useEffect } from "react";
import { Image, Button, TouchableOpacity, FlatList, Platform, ScrollView, KeyboardAvoidingView, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../components/CredentialsContext";
import axios from "axios";

import { Container2, Container3, Title2, Comments, Label3, SpaceButton, StyledTextInput } from "../components/styles";

import EmojiPicker from "rn-emoji-keyboard";

export default function CreateSpace(props, { navigation }) {
  const [spaceName, setSpaceName] = useState("");
  const [valid, setValid] = useState(false);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(["안녕", "Hello", "Hola"]);

  const [isOpen, setIsOpen] = useState(false);
  const [emoji, setEmoji] = useState("");

  const checkValid = (text) => {
    if (text.trim().length === 0) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const handleSelect = (emojiObject) => {
    if (emoji === emojiObject.emoji) {
      setEmoji("");
    } else {
      setEmoji(emojiObject.emoji);
    }
    //setComments([...comments, emojiObject.emoji]);

    /* example emojiObject = { 
          "emoji": "❤️",
          "name": "red heart",
          "slug": "red_heart",
        }
      */
  };

  const submitRequest = () => {
    setComments([...comments, comment]);
  };

  const now = new Date();
  return (
    <Container2>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <StatusBar style="light" />
        <Title2>{props.route.params.testValue}</Title2>

        <FlatList
          numColumns={1}
          horizontal={false}
          data={comments}
          renderItem={({ item }) => (
            <>
              <View style={{ flexDirection: "row" }}>
                <Label3>{item}</Label3>
                <Label3>{emoji}</Label3>
                <TouchableOpacity onPress={() => setIsOpen(true)}>
                  <Image
                    source={{
                      uri: "https://www.pinclipart.com/picdir/middle/136-1360910_emoji-svg-png-icon-free-download-139247-onlinewebfonts.png",
                    }}
                    style={{ width: 50, height: 50, alignContent: "center" }}
                  />
                </TouchableOpacity>
              </View>
              <Label3 style={{ fontSize: 17 }}>{now.toString()}</Label3>
              <TouchableOpacity onPress={() => setIsOpen(true)}>
                <Label3 style={{ fontSize: 17 }}>덧글 쓰기</Label3>
              </TouchableOpacity>
            </>
          )}
          keyExtractor={(item) => String(item.id)}
        />
      </KeyboardAvoidingView>

      {isOpen ? <EmojiPicker onEmojiSelected={handleSelect} open={isOpen} onClose={() => setIsOpen(false)} /> : null}

      <Button
        title="삭제"
        color="white"
        onPress={() => {
          const now = new Date();
        }}
      />
      <Container3>
        <StyledTextInput value={comment} onChangeText={(value) => setComment(value)} placeholder={"댓글을 입력하세요."} />
        <TouchableOpacity onPress={() => submitRequest()} disabled={!comment}>
          <Label3>저장</Label3>
        </TouchableOpacity>
      </Container3>
    </Container2>
  );
}
