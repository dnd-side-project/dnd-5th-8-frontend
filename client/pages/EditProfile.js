import React, { useState, useContext, useEffect } from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  Clipboard,
  Button,
  Switch,
  StyleSheet,
  Modal,
  Alert,
  TouchableHighlight,
} from "react-native";
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

import { Snackbar } from "react-native-paper";

const URL = "http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080";

export default function EditProfile(props) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId, space, spaceId } = storedCredentials;
  const AvatarImg = photoUrl
    ? {
        uri: photoUrl,
      }
    : require("../assets/sample.jpeg");

  const [text, setText] = useState(name);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (text.trim().length !== 0) {
      setReset(true);
    } else {
      setReset(false);
    }
  }, [text]);

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //allowsEditing: true,
    });

    if (pickerResult.cancelled === false) {
      const formData = new FormData();
      const photo = {
        uri: pickerResult.uri,
        type: "multipart/form-data",
        name: "testname.jpg",
      };
      formData.append("nickname", name);
      formData.append("profile", photo);

      axios
        .put(`${URL}/user/${userId}`, formData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((res) => {
          const credentials = {
            name: name,
            email: email,
            photoUrl: res.data.profile,
            userId: userId,
          };
          props.setCredentials(credentials);
        })
        .catch((err) => alert(`에러:${err}`));
    }
  };

  const addDocumentFile = async () => {
    let result = await DocumentPicker.getDocumentAsync();

    if (result.type !== "cancel") {
      const credentials = {
        name: name,
        email: email,
        photoUrl: result.uri,
        userId: userId,
        space: space,
        spaceId: spaceId,
      };

      setStoredCredentials(credentials);

      const formData = new FormData();
      const photo = {
        uri: result.uri,
        type: "multipart/form-data",
        name: "testname.jpg",
      };
      formData.append("nickname", name);
      formData.append("profile", photo);

      axios
        .put(`${URL}/user/${userId}`, formData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((res) => {})
        .catch((err) => alert(`에러:${err}`));
    }
  };

  const handleDeleteText = () => {
    setText("");
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleSaveName = () => {
    const credentials = {
      name: text,
      email: email,
      photoUrl: photoUrl,
      userId: userId,
      space: space,
      spaceId: spaceId,
    };
    setStoredCredentials(credentials);

    const formData = new FormData();

    formData.append("nickname", name);

    axios
      .put(`${URL}/user/${userId}`, formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {})
      .catch((err) => alert(`에러:${err}`));
  };

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
        }}
      >
        <Text style={{ color: "white", fontSize: 23, fontWeight: "700", textAlign: "center", top: 77 }}>프로필 수정</Text>

        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ position: "absolute", top: 80, left: 30 }}>
          <Image source={require("../assets/back-arrow.png")} />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", position: "absolute", top: 130 }}>
        <Avatar resizeMode="cover" source={AvatarImg} style={{ width: 130, height: 130 }} />
        <TouchableOpacity onPress={addDocumentFile} style={{ zIndex: 1 }}>
          <View
            style={{
              position: "absolute",
              left: -30,
              top: 100,
              padding: 13,
              borderRadius: 25,
              backgroundColor: "#F2F4F8",
            }}
          >
            <Image source={require("../assets/camera.png")} style={{ padding: 10, backgroundColor: "#F2F4F8" }} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", position: "relative" }}>
        <MainTextInput value={text} onChangeText={(value) => setText(value)} style={{ width: "90%" }} placeholder="이름" />
        {reset ? (
          <TouchableOpacity onPress={() => handleDeleteText()}>
            <Image source={require("../assets/close.png")} style={{ position: "absolute", padding: 10, top: 20, right: 7 }} />
          </TouchableOpacity>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={() => {
          handleSaveName();
          setModalVisible(true);
        }}
        style={{ width: "100%", alignItems: "center", marginTop: 35, marginBottom: 200 }}
        disabled={!text}
      >
        <LinearGradient
          colors={["#3C0CE3", "#3C0CE3"]}
          style={{
            width: "90%",
            height: 55,
            borderRadius: 8,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Label3>저장하기</Label3>
        </LinearGradient>
      </TouchableOpacity>

      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal> */}

      <StatusBar style="light" />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
