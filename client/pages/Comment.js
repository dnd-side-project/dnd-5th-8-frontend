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
import { set } from "react-native-reanimated";

const URL = "http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080/";

export default function Comment(props) {
  // Home 컴포넌트에서 값을 가져옴
  // navigation.navigate의 매개변수로 들어있었기 때문에 props.route.params
  const { name, email, photoUrl } = props.route.params.credentials;

  const { communicationList, postId } = { postId: [1, 2, 3, 4, 5, 6, 7], communicationList: [2, 4, 6] };

  const [ready, setReady] = useState(false);

  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate();
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  minute = minute >= 10 ? minute : `0${minute}`;
  let second = new Date().getSeconds();
  second = second >= 10 ? second : `0${second}`;
  const time = `${year}.${month}.${day} ${hour}:${minute}:${second}`;

  // 서버 연동 시 주고 받으면서 매번 확인하기!
  // 추후에 초기화값에 0이 아닌 서버에서 받아온 값 넣기
  // 그러면 키 뿐만 아니라 모든 값도 같이 받아오면 될 듯?
  const [key, setKey] = useState(0);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [emoji, setEmoji] = useState("");

  const [questionList, SetQuenstionList] = useState([]);
  const [answerList, SetAnswerList] = useState([]);

  useEffect(() => {
    // 서버 DB에 저장된 데일리퀘스천 가져오기
    // axios.post("/dailyquestion", { postId: postId }).then((res) => alert(res));
    // // 서버 DB에 저장된 댓글 가져오기
    // axios.post("/comment", { postId: postId }).then((res) => {});
    //.catch((err) => alert("댓글을 받아오지 못했습니다."));
  });

  const handleAddComment = (input) => {
    Keyboard.dismiss();

    const newComment = [...commentList, input];
    setCommentList(newComment);
    setKey(key + 1);

    // axios
    //   .post("URL", input)
    //   .then((res) => alert(res))
    //   .catch((err) => alert(err));
  };

  const handleEditComment = (input) => {
    const newComment = [...commentList, input];
  };

  const handleDeleteComment = (comment) => {
    const newCommentList = commentList.filter((item) => item.key !== comment.key);

    setCommentList(newCommentList);

    // axios
    //   .delete("URL", input)
    //   .then((res) => alert(res))
    //   .catch((err) => alert(err));
  };

  const loadCommentList = () => {
    // axios
    // 서버 DB에 저장된 데일리퀘스천 가져오기
    // axios.post("/dailyquestion", { postId: postId }).then((res) => alert(res));
    // setCommentList(res);
    // // 서버 DB에 저장된 댓글 가져오기
    // axios.post("/comment", { postId: postId }).then((res) => {});
    //.catch((err) => alert("댓글을 받아오지 못했습니다."));
    return;
  };

  const handleEmojiSelect = (emojiObject) => {
    console.log(typeof emojiObject.emoji);
    // 같으면 삭제, 다르면 추가
    if (emoji === emojiObject.emoji) {
      setEmoji("");
    } else {
      setEmoji(emojiObject.emoji);
    }
  };

  if (!ready) {
    return <AppLoading startAsync={loadCommentList} onFinish={() => setReady(true)} onError={console.warn} />;
  }

  const getDailyQuestion = () => {
    const newQuestionList = [...questionList];

    axios
      .get(`${URL}/daily-questions/list/space/2`)
      .then((res) => {
        res.data.map((element) => {
          // 중복 제거 구현 필요
          newQuestionList.push(element);
          SetQuenstionList(newQuestionList);
        });
      })
      .catch((err) => alert(err));
  };

  const getAnswer = (id) => {
    const newAnswerList = [...answerList];

    axios
      .get(`${URL}/daily-questions/${id}/space/2`)
      .then((res) => {
        console.log("TEST:", res.data);
        res.data.answer.map((elem) => {
          newAnswerList.push(elem.content);
          SetAnswerList(newAnswerList);
        });
      })
      .catch((err) => alert(err));
  };

  return (
    <Container2>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <FlatList
          data={questionList}
          renderItem={({ item }) => (
            <View>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Label3>{item.content}</Label3>
                <TouchableOpacity onPress={() => getAnswer(item.questionId)}>
                  <Label3>답변 {item.answerCount}</Label3>
                </TouchableOpacity>
              </View>
              <Label3 style={{ fontSize: 17, fontWeight: "300" }}>{item.date}</Label3>
            </View>
          )}
        />
        <FlatList
          style={{ height: "70%" }}
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    url: item.photoUrl,
                  }}
                  style={{ width: 50, height: 50, alignContent: "center", borderRadius: 25 }}
                />
                <Title2 style={{ padding: 7 }}>{item.name}</Title2>
                <Label3>{item.comment}</Label3>
              </View>

              <Label3 style={{ fontSize: 17, fontWeight: 0 }}>{item.time}</Label3>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => setIsOpenEmoji(true)}>
                  <Image
                    source={{
                      uri: "https://www.pinclipart.com/picdir/middle/136-1360910_emoji-svg-png-icon-free-download-139247-onlinewebfonts.png",
                    }}
                    style={{ width: 50, height: 50, alignContent: "center" }}
                  />
                </TouchableOpacity>
                <Label3>{emoji}</Label3>
                <TouchableOpacity>
                  <Label3 style={{ fontSize: 17 }}>덧글 쓰기</Label3>
                </TouchableOpacity>
                <Button title="수정" color="white" onPress={handleEditComment} />
                <Button title="삭제" color="white" onPress={(id) => handleDeleteComment(item)} />
              </View>
            </View>
          )}
          keyExtractor={(item) => String(item.id)}
        />
      </KeyboardAvoidingView>

      {isOpenEmoji ? (
        <EmojiPicker onEmojiSelected={handleEmojiSelect} open={isOpenEmoji} onClose={() => setIsOpenEmoji(false)} />
      ) : null}

      <TouchableOpacity onPress={getDailyQuestion}>
        <Label3>데일리퀘스천 가져오기</Label3>
      </TouchableOpacity>
      <Container3>
        <StyledTextInput value={comment} onChangeText={(value) => setComment(value)} placeholder={"댓글을 입력하세요."} />
        <TouchableOpacity
          onPress={() => {
            setComment("");
            handleAddComment({ key: key, photoUrl: photoUrl, name: name, comment: comment, emoji, emoji, time: time });
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
