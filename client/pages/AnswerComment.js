import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Image, Text, View, FlatList, Button, Switch, Dimensions, TextInput } from "react-native";
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
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";

const URL = "http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080";
const Width = Dimensions.get("window").width; //스크린 너비 초기화
const Height = Dimensions.get("window").height; //스크린 높이 초기화

export default function AnswerComment(props) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId, space, spaceId } = storedCredentials;

  const [answerList, setAnswerList] = useState([]);
  const [commentList, setCommentList] = useState([]);

  const [image, setImage] = useState();

  useEffect(() => {
    axios
      .get(`${URL}/daily-questions/${props.route.params.questionId}/space/${spaceId}`)
      .then((res) => {
        setAnswerList(res.data.answer);
        setCommentList(res.data.comment);

        console.log(JSON.stringify(res.data));
      })
      .catch((err) => alert("통신 목록을 불러오지 못했습니다."));
  }, []);

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
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ position: "absolute", top: 80, left: 30 }}>
          <Image source={require("../assets/back-arrow.png")} />
        </TouchableOpacity>
      </View>

      <View style={{ top: 120, width: "100%", left: 20 }}>
        <Text style={{ fontSize: 15, color: "#B7B7B7" }}>{props.route.params.date}</Text>
        <Text style={{ fontSize: 20, fontWeight: "500", marginVertical: 10 }}>Q. {props.route.params.questionContent}</Text>
      </View>

      {answerList.length ? (
        <FlatList
          style={{ top: 110, width: "100%" }}
          data={answerList}
          renderItem={({ item }) => (
            <>
              <View style={{ flexDirection: "row", marginVertical: 15 }}>
                <Avatar
                  resizeMode="cover"
                  source={{ uri: item.user_profile }}
                  style={{ position: "absolute", width: 40, height: 40, left: 30, bottom: 30 }}
                />
                <Text style={{ fontSize: 18, fontWeight: "600", padding: 20, position: "absolute", left: 8, top: 50 }}>
                  {item.user_nickName}
                </Text>
                <View style={{ padding: 19, margin: 10, backgroundColor: "#EAEAEA", borderRadius: 10, width: 300, left: 100 }}>
                  <Text style={{ fontSize: 18 }}> {item.content}</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                    padding: 7,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: "#DADFE9",
                    width: 40,
                    height: 30,
                    position: "absolute",
                    left: 120,
                    top: 100,
                  }}
                >
                  <Image source={require("../assets/emoji.png")} style={{ padding: 7 }} />
                  <Text style={{ fontSize: 10, marginLeft: 3 }}>+</Text>
                </View>
              </View>
            </>
          )}
          keyExtractor={(item) => item.user_nickName}
        />
      ) : null}

      <View style={{ width: "100%", padding: 3, backgroundColor: "#EAEAEA" }} />

      <View style={{ width: "100%" }}>
        <Text style={{ fontSize: 20, fontWeight: "500", margin: 25 }}>댓글 ({commentList.length})</Text>
      </View>

      <FlatList
        style={{
          width: "100%",
        }}
        data={commentList}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row" }}>
            <Avatar
              source={{ uri: item.user_profile }}
              style={{ width: 50, height: 50, position: "absolute", left: 20, bottom: 40 }}
            />
            <View style={{ left: 70, top: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: "600", paddingHorizontal: 20 }}>{item.user_nickName}</Text>
              <Text style={{ fontSize: 18, paddingHorizontal: 20, paddingVertical: 13, left: 3 }}>{item.content}</Text>

              <Text style={{ fontSize: 15, color: "#B7B7B7", paddingHorizontal: 20, paddingBottom: 20 }}>{item.createdDate}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.user_nickName}
      />

      <View style={{ position: "absolute", bottom: 10, paddingVertical: 30, width: Width }}>
        <View style={{ width: Width, paddingVertical: 1.5, backgroundColor: "#EAEAEA" }} />

        <View style={{ flexDirection: "row", padding: 20 }}>
          <Image source={require("../assets/picture.png")} style={{ padding: 15 }} />

          <TextInput
            placeholder="댓글을 남겨보세요"
            style={{ fontSize: 18, fontWeight: "600", alignSelf: "center", marginLeft: 15 }}
          ></TextInput>

          <TouchableOpacity style={{ borderWidth: 1, borderRadius: 4, padding: 10, right: 20, top: 20, position: "absolute" }}>
            <Text style={{ color: "#797E8B" }}>등록</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="light" />
    </MainContainer>
  );
}
