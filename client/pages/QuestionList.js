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

export default function QuestionList(props) {
  const [questionList, setQuestionList] = useState([1, 2, 3]);
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

        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ position: "absolute", top: 80, right: 30 }}>
          <Image source={require("../assets/back-arrow.png")} />
        </TouchableOpacity>
      </View>

      <FlatList
        style={{
          width: "100%",
          top: 120,
        }}
        data={questionList}
        renderItem={({ question }) => (
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
              <Text style={{ fontSize: 20, fontWeight: "600" }}>치킨 피자</Text>
              <Text style={{ color: "#B7B7B7", paddingTop: 10 }}>2021.1.1</Text>
            </View>

            <TouchableOpacity style={{ height: "100%", backgroundColor: "#F0E0FF", padding: 15, borderRadius: 8 }}>
              <Text style={{ color: "#7C58FF", fontSize: 15 }}>댓글</Text>
            </TouchableOpacity>
          </View>
        )}
        // keyExtractor={(item) => String(item.id)}
      />

      <StatusBar style="light" />
    </MainContainer>
  );
}
