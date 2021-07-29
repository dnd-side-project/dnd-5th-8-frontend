import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, Alert } from "react-native";
//import { Alert } from "react-native-bootstrap";

import Login from "./components/Login";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Login />
      <Text style={styles.title}>에잇</Text>
      <View style={styles.buttonEmail}>카카오톡으로 로그인</View>
      <View
        title="Press me"
        style={styles.buttonKakao}
        onPress={() => {
          Alert.alert("Simple Button pressed");
        }}
      >
        이메일로 로그인
      </View>
      <Text style={styles.signUp}>이메일로 가입하기</Text>
      <Button title="Press me" onPress={() => Alert.alert("Simple Button pressed")}></Button>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: "100px",
    fontWeight: "700",
    color: "white",
    position: "absolute",
    top: "100px",
  },
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#170C59",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonKakao: {
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",

    width: "297px",
    height: "45px",

    backgroundColor: "#D5AAFF",
    border: "1px solid rgba(,,,0)",
    boxSizing: "border-box",
    borderRadius: "80px",
    boxShadow: "5px 5px 5px",

    fontWeight: "700",

    margin: "30px",
  },

  buttonEmail: {
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    width: "297px",
    height: "45px",

    backgroundColor: "#FFD600",
    border: "1px solid rgba(,,,0)",
    boxSizing: "border-box",
    borderRadius: "80px",
    boxShadow: "5px 5px 5px",

    fontWeight: "700",

    margin: "30px",
  },

  signUp: {
    color: "gray",
    textDecorationLine: "underline",
  },
});
