import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
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
  SafeAreaView,
} from "react-native";

import { CredentialsContext } from "../components/CredentialsContext";
import axios from "axios";
import { Avatar, MainContainer, Title, Comments, Label3, SpaceButton, StyledTextInput, Container2 } from "../components/styles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import styled from "styled-components";

const Colors = {
  green: "#DAF9C2",
  yellow: "#FFEFC7",
  blue: "#D7F3FF",
  pink: "#FFD7FB",
  azure: "#D7DBFF",
  lilac: "#B898F8",
};

const colorSet = [Colors.green, Colors.yellow, Colors.blue, Colors.pink, Colors.azure, Colors.lil];
const randomNumber = Math.floor(Math.random() * (6 - 0) + 0);

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const NewLetterBox = styled.View`
  background: ${Colors.lilac};
  width: 90%;
  height: 270;
  border-radius: 8;
`;

const Tab = createMaterialTopTabNavigator();

function ReceiveBox(props) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId, space, spaceId } = storedCredentials;
  const [userList, setUserList] = useState([]);
  const [letterList, setLetterList] = useState([]);
  const [newLetter, setNewLetter] = useState(false);

  useEffect(() => {
    axios
      .get(`${URL}/letter/recieve/${userId}/${spaceId}`)
      .then((res) => {
        setUserList(res.data.family);
        setLetterList(res.data.recieveletter);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <View style={{ width: Width, justifyContent: "center", alignItems: "center", backgroundColor: "white", paddingTop: 10 }}>
      <FlatList
        style={{ width: Width, paddingHorizontal: 20, paddingBottom: 10 }}
        horizontal={true}
        data={userList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => props.navigation.navigate("DetailLetter")}>
            <Avatar resizeMode="cover" source={{ uri: item.profile }} style={{ width: 60, height: 60 }} />
          </TouchableOpacity>
        )}
        // keyExtractor={(item) => String(item.id)}
      />

      <TouchableOpacity onPress={() => props.navigation.navigate("DetailLetter")}>
        <View style={{ width: Width, alignItems: "center", marginVertical: 10 }}>
          <NewLetterBox>
            <Image
              source={require("../assets/letter.png")}
              style={{ position: "absolute", top: 20, left: 23, padding: 60, paddingHorizontal: 170 }}
            />
            <View
              style={{
                width: 70,
                padding: 7,
                borderRadius: 12,
                backgroundColor: "red",
                position: "absolute",
                top: 10,
                right: 10,
              }}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: "700", textAlign: "center" }}>NEW</Text>
            </View>

            <View style={{ flexDirection: "row" }}></View>
          </NewLetterBox>
        </View>
      </TouchableOpacity>

      <FlatList
        data={letterList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => props.navigation.navigate("DetailLetter")}>
            <View style={{ width: Width, alignItems: "center", marginVertical: 10 }}>
              <NewLetterBox style={{ backgroundColor: `${Colors.green}` }}>
                <View style={{ flexDirection: "row", top: 10 }}>
                  <Avatar resizeMode="cover" source={{ uri: userList[0].profile }} style={{ width: 30, height: 30, right: 80 }} />
                  <Text style={{ fontSize: 20, fontWeight: "600", right: 170, top: 14, color: "#611DF2" }}>
                    {item.recieveNickname}
                  </Text>
                  <Text style={{ fontSize: 20, fontWeight: "600", right: 170, top: 12 }}>에게 온 편지</Text>
                </View>
                <Text style={{ fontSize: 17, padding: 30, paddingHorizontal: 40 }}>{item.content}</Text>
              </NewLetterBox>
            </View>
          </TouchableOpacity>
        )}
        // keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
}
function SendBox() {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId, space, spaceId } = storedCredentials;

  const [letterList, setLetterList] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/letter/send/${userId}`)
      .then((res) => {
        setLetterList(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  console.log("letterList...", letterList);

  return (
    <View
      style={{ flex: 1, width: Width, justifyContent: "center", alignItems: "center", backgroundColor: "white", paddingTop: 100 }}
    >
      <FlatList
        data={letterList}
        renderItem={({ item }) => (
          <View style={{ width: Width, alignItems: "center", marginBottom: 20 }}>
            <NewLetterBox style={{ backgroundColor: `${Colors.yellow}` }}>
              <View style={{ flexDirection: "row", top: 10 }}>
                <Avatar resizeMode="cover" source={{ uri: item.toProfile }} style={{ width: 30, height: 30, right: 80 }} />
                <Text style={{ fontSize: 20, fontWeight: "600", right: 170, top: 14, color: "#611DF2" }}>{item.toNickname}</Text>
                <Text style={{ fontSize: 20, fontWeight: "600", right: 170, top: 12 }}>에게 보낸 편지</Text>
              </View>
              <Text style={{ fontSize: 17, padding: 30, paddingHorizontal: 40 }}>{item.content}</Text>
            </NewLetterBox>
          </View>
        )}
      />
    </View>
  );
}

function Tabs({ navigation }) {
  return (
    <Tab.Navigator
      style={{ top: 100, zIndex: -1 }}
      screenOptions={{
        tabBarLabelStyle: { fontSize: 18, fontWeight: "500" },
        tabBarItemStyle: { width: 130 },
        tabBarIndicatorStyle: { padding: 1.5, backgroundColor: "#4136F1" },
        tabBarScrollEnabled: false,
      }}
      tabBarOptions={{
        activeTintColor: "#4136F1", // 탭 활성
        inactiveTintColor: "#797E8B", // 탭 비활성
      }}
      swipeEnabled={false}
    >
      <Tab.Screen name="받은 편지함" component={ReceiveBox} navigation={navigation} />
      <Tab.Screen name="보낸 편지함" component={SendBox} />
    </Tab.Navigator>
  );
}

const URL = "http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080";

export default function Letter({ navigation }) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId, space, spaceId } = storedCredentials;

  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [token, setToken] = useState();

  const [showSend, setShowSend] = useState(false);
  const [showReceive, setShowReceive] = useState(false);

  const [letterList, setLetterList] = useState(["편지1", "편지2"]);

  return (
    <>
      <View
        style={{
          width: "100%",
          height: "13%",
          borderRadius: 8,
          position: "absolute",
          top: -20,
          backgroundColor: "#170C59",
        }}
      >
        <Text style={{ color: "white", fontSize: 23, fontWeight: "700", textAlign: "center", top: 77 }}>우주 편지</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SendLetter");
          }}
          style={{ position: "absolute", top: 80, right: 25 }}
        >
          <Image source={require("../assets/pencil.png")} style={{ padding: 10 }} />
        </TouchableOpacity>
      </View>

      <Tabs />

      <StatusBar style="light" />
    </>
  );
}
