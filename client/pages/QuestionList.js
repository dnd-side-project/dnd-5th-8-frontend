import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Image, Text, View, Clipboard, Button, Switch, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CredentialsContext } from "../components/CredentialsContext";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import {
  MainContainer,
  MainTextInput,
  Container,
  SpaceButton,
  StyledTextInput,
  Title,
  Label,
  Label2,
  Label3,
  Avatar,
  TestButton,
  LogOutButton,
} from "../components/styles";

import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import Toast, { DURATION } from "react-native-easy-toast";
import { Snackbar } from "react-native-paper";

const URL = "http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080";

export default function QuestionList({ navigation }) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId, space, spaceId } = storedCredentials;

  const [questionList, setQuestionList] = useState([]);
  const [commentLength, setCommentLength] = useState([]);

  useEffect(() => {
    // 임시로 오늘의 질문 조회
    axios
      .get(`${URL}/daily-questions/space/${spaceId}`)
      .then((res) => {
        let temp = [...questionList];
        temp.push(res.data);
        setQuestionList(temp);
      })
      .catch((err) => alert("통신 목록을 불러오지 못했습니다."));
    // axios
    //   .get(`${URL}/daily-questions/list/space/${spaceId}`)
    //   .then((res) => setQuestionList(res.data))
    //   .catch((err) => alert("통신 목록을 불러오지 못했습니다."));
  }, []);

  useEffect(() => {
    if (questionList.length > 0) {
      axios
        .get(`${URL}/daily-questions/1/space/${spaceId}`)
        .then((res) => {
          setCommentLength(res.data.comment.length);
        })
        .catch((err) => alert("통신 목록을 불러오지 못했습니다."));
    }
  });

  console.log("questionList:", questionList);

  return (
    <MainContainer>
      <View
        style={{
          width: "100%",
          height: "13%",
          borderRadius: 8,
          position: "absolute",
          top: -20,
          backgroundColor: "#170C59",
          zIndex: 1,
        }}
      >
        <Text style={{ color: "white", fontSize: 23, fontWeight: "700", textAlign: "center", top: 77 }}>통신 목록</Text>
      </View>

      {questionList.length ? (
        <FlatList
          style={{
            width: "100%",
            top: 120,
          }}
          data={questionList}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "95%",

                padding: 10,
                marginVertical: 5,
                marginLeft: 10,

                borderWidth: 2,
                borderColor: "#F2F4F8",
                borderRadius: 8,
              }}
            >
              <View>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>{item.questionContent}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "#B7B7B7", paddingTop: 10 }}>{item.date.substring(0, 10)}</Text>
                  <Text style={{ color: "#B7B7B7", paddingTop: 10, marginLeft: 30 }}>{item.answerCount}2명 답변</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AnswerComment", {
                    // 추후에 id 확인할 것
                    questionId: 1,
                    questionContent: item.questionContent,
                    date: item.date.substring(0, 10),
                  })
                }
                style={{ height: "100%", backgroundColor: "#F0E0FF", padding: 15, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 17, fontWeight: "500", textAlign: "center" }}>{commentLength}</Text>
                <Text style={{ color: "#7C58FF", fontSize: 15, marginTop: 5 }}>댓글</Text>
              </TouchableOpacity>
            </View>
          )}
          // keyExtractor={(item) => String(item.id)}
        />
      ) : (
        <View style={{ width: "100%", alignItems: "center" }}>
          <Image source={require("../assets/nothing.png")} style={{ padding: 110 }} />
          <Text style={{ color: "#BFC3CF", fontSize: 23, fontWeight: "600", padding: 20, paddingTop: 70 }}>
            아직 생성된 통신이 없어요
          </Text>
          <Text style={{ color: "#BFC3CF", fontSize: 18, fontWeight: "500", marginBottom: 200 }}>내일 만나요!</Text>
        </View>
      )}
      <StatusBar style="light" />
    </MainContainer>
  );
}
