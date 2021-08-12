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
} from "react-native";
import { StatusBar } from "expo-status-bar";

import AppLoading from "expo-app-loading";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../components/CredentialsContext";
import axios from "axios";

import { Container2, Container3, Title2, Comments, Label3, SpaceButton, StyledTextInput } from "../components/styles";

import EmojiPicker from "rn-emoji-keyboard";

export default function CreateSpace(props) {
  const [ready, setReady] = useState(false);

  const time = new Date().toUTCString();
  const [now, setNow] = useState(time);

  const [number, setNumber] = useState(2);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([
    {
      key: 0,
      id: "test1@email.com",
      title: "댓글1",
    },
    {
      key: 1,
      id: "test2@email.com",
      title: "댓글2",
    },
  ]);

  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [emoji, setEmoji] = useState("");

  const [edited, setEdited] = useState(null);

  const { name, email, photoUrl } = props.route.params.credentials;

  // 서버에 보낼 데이터
  const body = {
    name: name,
    email: email,
    photoUrl: photoUrl,
    time: now,
    emoji: emoji,
  };

  const handleEmojiSelect = (emojiObject) => {
    if (emoji === emojiObject.emoji) {
      setEmoji("");
    } else {
      setEmoji(emojiObject.emoji);
    }
  };

  const handleAddComment = (input) => {
    Keyboard.dismiss();

    const newComment = [...commentList, input];

    AsyncStorage.setItem("storedComments", JSON.stringify(newComment))
      .then(() => {
        setCommentList(newComment);
        setComment("");
      })
      .catch((err) => alert(err));
  };

  const handleEditComment = (input) => {
    const newComment = [...commentList, input];
  };

  const handleDeleteComment = (key) => {
    const newCommentList = [...commentList];

    const commentIndex = commentList.findIndex((item) => {
      alert(item.key);
      item.key === key;
    });

    //const key = `${(todos[todos.length - 1] && parseInt(todos[todos.length - 1].key) + 1) || 1}`;

    // commentList에서 commentIndex번째 인덱스부터 1개 원소 제거
    newCommentList.splice(commentIndex, 1);

    AsyncStorage.setItem("storedComments", JSON.stringify(newCommentList))
      .then(() => {
        setCommentList(newCommentList);
      })
      .catch((err) => alert(err));
  };

  const loadCommentList = () => {
    // axios
  };

  // 100vw
  const width = Dimensions.get("window").width;

  if (!ready) {
    return <AppLoading startAsync={loadCommentList} onFinish={() => setReady(true)} onError={console.warn} />;
  }

  return (
    <Container2>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <FlatList
          style={{ marginTop: 150, width: width }}
          numColumns={1}
          horizontal={false}
          data={commentList}
          renderItem={({ item }) => (
            <View
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "white",
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{
                    uri: photoUrl,
                  }}
                  style={{ width: 50, height: 50, alignContent: "center", borderRadius: 25 }}
                />
                <Title2 style={{ padding: 7 }}>{name}</Title2>
                <Label3>{item.title}</Label3>
                <TouchableOpacity onPress={() => setIsOpenEmoji(true)}>
                  <Image
                    source={{
                      uri: "https://www.pinclipart.com/picdir/middle/136-1360910_emoji-svg-png-icon-free-download-139247-onlinewebfonts.png",
                    }}
                    style={{ width: 50, height: 50, alignContent: "center" }}
                  />
                </TouchableOpacity>
              </View>

              <Label3 style={{ fontSize: 17, fontWeight: 0 }}>{now.toString()}</Label3>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Label3>{emoji}</Label3>
                <TouchableOpacity
                  onPress={() => {
                    alert(item.key);
                  }}
                >
                  <Label3 style={{ fontSize: 17 }}>덧글 쓰기</Label3>
                </TouchableOpacity>
                <Button title="수정" color="white" onPress={handleEditComment} />
                <Button title="삭제" color="white" onPress={() => handleDeleteComment(item.key)} />
              </View>
            </View>
          )}
          keyExtractor={(item) => String(item.id)}
        />
      </KeyboardAvoidingView>

      {isOpenEmoji ? (
        <EmojiPicker onEmojiSelected={handleEmojiSelect} open={isOpenEmoji} onClose={() => setIsOpenEmoji(false)} />
      ) : null}

      <Container3>
        <StyledTextInput value={comment} onChangeText={(value) => setComment(value)} placeholder={"댓글을 입력하세요."} />
        <TouchableOpacity
          onPress={() => {
            handleAddComment({ title: comment, id: "1@test.com", key: number });
            setNumber(number + 1);
            setNow(time);
          }}
          disabled={!comment}
        >
          <Label3>저장</Label3>
        </TouchableOpacity>
      </Container3>

      <StatusBar style="light" />
    </Container2>
  );
}
