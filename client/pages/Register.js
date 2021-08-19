import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Image, Platform, View, KeyboardAvoidingView, SafeAreaView, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../components/CredentialsContext";
import axios from "axios";

import { MainContainer, SpaceButton, StyledTextInput, MainTitle, Label3, Avatar, MainTextInput } from "../components/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { LinearGradient } from "expo-linear-gradient";

import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

const URL = "http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080";

export default function Register({ navigation }) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, userId, space } = storedCredentials;

  const [text, setText] = useState(name);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (text.trim().length !== 0) {
      setReset(true);
    } else {
      setReset(false);
    }
  }, [text]);

  const AvatarImg = photoUrl
    ? {
        uri: photoUrl,
      }
    : require("../assets/sample.jpeg");

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("카메라 접근 허용이 필요합니다!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });

    console.log("pickerResult:", pickerResult);

    if (pickerResult.cancelled === false) {
      const credentials = {
        name: name,
        email: email,
        photoUrl: pickerResult.uri,
        userId: userId,
      };
      setStoredCredentials(credentials);

      // const body = {
      //   nickname: name,
      //   profile: photoUrl,
      // };

      // axios
      //   .put(`${URL}/user/${userId}`, body, {
      //     headers: {
      //       "content-type": "multipart/form-data",
      //     },
      //   })
      //   .then((res) => alert(JSON.stringify(res)))
      //   .catch((err) => alert(err));
    }
  };

  const openDocumentPickerAsync = async () => {
    let result = await DocumentPicker.getDocumentAsync();

    console.log(result);
    if (result.type !== "cancel") {
      const credentials = {
        name: name,
        email: email,
        photoUrl: result.uri,
        userId: userId,
      };

      setStoredCredentials(credentials);

      const body = {
        nickname: name,
        profile: photoUrl,
      };

      axios
        .put(`${URL}/user/${userId}`, body, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => alert(JSON.stringify(res)))
        .catch((err) => alert(err));
    }
  };

  const handleDeleteText = () => {
    setText("");
  };

  const handleSubmit = () => {
    const credentials = {
      name: text,
      email: email,
      photoUrl: photoUrl,
      userId: userId,
      space: space,
    };
    setStoredCredentials(credentials);

    navigation.navigate("Space");
  };

  return (
    <MainContainer>
      <MainTitle>가족과 대화할{"\n"}내 프로필을 작성해주세요.</MainTitle>

      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <Avatar resizeMode="cover" source={AvatarImg} style={{ width: 150, height: 150 }} />
        <TouchableOpacity onPress={openImagePickerAsync} style={{ zIndex: 1 }}>
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

      <View style={{ flexDirection: "row", marginBottom: 150 }}>
        <MainTextInput onChangeText={(value) => setText(value)} defaultValue={text} style={{ width: 130 }} />
        {reset ? (
          <TouchableOpacity onPress={() => handleDeleteText()} style={{ zIndex: 1 }}>
            <Image source={require("../assets/close.png")} style={{ position: "absolute", padding: 10, top: 15, right: 0 }} />
          </TouchableOpacity>
        ) : null}
      </View>

      <Button
        onPress={() => {
          navigation.navigate("Home");
        }}
        title="홈페이지"
      />

      <TouchableOpacity onPress={handleSubmit} style={{ width: "100%", alignItems: "center", position: "absolute", bottom: 50 }}>
        <LinearGradient
          colors={["#8743FF", "#4136F1"]}
          start={{ x: 1, y: 0 }}
          style={{
            width: "90%",
            height: 55,
            borderRadius: 8,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Label3>완료</Label3>
        </LinearGradient>
      </TouchableOpacity>

      <StatusBar style="dark" />
    </MainContainer>
  );
}
