import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Image, Text, View, FlatList, Button, Switch } from "react-native";
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

export default function AnswerComment(props) {
  return (
    <MainContainer>
      <FlatList
        data={letterList}
        renderItem={({ letter }) => (
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
        )}
        // keyExtractor={(item) => String(item.id)}
      />

      <StatusBar style="light" />
    </MainContainer>
  );
}
