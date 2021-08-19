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
import { MainContainer, Title, Comments, Label3, SpaceButton, StyledTextInput, Container2 } from "../components/styles";
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
  background: ${colorSet[randomNumber]};
  width: 90%;
  height: 270;
  border-radius: 8;
`;

const Tab = createMaterialTopTabNavigator();

function ReceiveBox(props) {
  const [userList, setUserList] = useState([]);
  const [letterList, setLetterList] = useState([1, 2, 3, 4, 5]);
  const [newLetter, setNewLetter] = useState(false);

  return (
    <View
      style={{ flex: 1, width: Width, justifyContent: "center", alignItems: "center", backgroundColor: "white", paddingTop: 100 }}
    >
      <FlatList
        data={letterList}
        renderItem={({ letter }) => (
          <TouchableOpacity onPress={() => props.navigation.navigate("DetailLetter")}>
            <View style={{ width: Width, alignItems: "center", marginBottom: 20 }}>
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
  const [userList, setUserList] = useState([]);
  const [letterList, setLetterList] = useState([1, 2, 3]);
  return (
    <View
      style={{ flex: 1, width: Width, justifyContent: "center", alignItems: "center", backgroundColor: "white", paddingTop: 100 }}
    >
      <FlatList
        data={letterList}
        renderItem={({ letter }) => (
          <View style={{ width: Width, alignItems: "center", marginBottom: 20 }}>
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

export default function Letter(props, { navigation }) {
  const { name, email, photoUrl, userId } = props.route.params.credentials;

  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [token, setToken] = useState();

  const [showSend, setShowSend] = useState(false);
  const [showReceive, setShowReceive] = useState(false);

  const [letterList, setLetterList] = useState(["편지1", "편지2"]);

  useEffect(() => {
    axios.get(`${URL}/letter/recieve/${userId}/`);
  }, []);

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

// function SendPage(props) {
//   const [content, setContent] = useState("");
//   const [valid, setValid] = useState(false);

//   useEffect(() => {
//     if (content.trim().length !== 0) {
//       setValid(true);
//     } else setValid(false);
//   }, [content]);
//   return (
//     <MainContainer>
//       <Label3>{}에게</Label3>

//       <StyledTextInput
//         style={{ width: 300, height: 200 }}
//         multiline={true}
//         numberOfLines={5}
//         value={content}
//         onChangeText={(value) => {
//           setContent(value);
//         }}
//         placeholder="편지에 마음을 담아보세요."
//       />
//       {valid ? (
//         <TouchableOpacity disabled={!content}>
//           <Label3>보내기 가능</Label3>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity disabled={!content}>
//           <Label3>보내기 불가</Label3>
//         </TouchableOpacity>
//       )}

//       <Button title="뒤로 가기" onPress={props.setShow(false)} />
//     </MainContainer>
//   );
// }
