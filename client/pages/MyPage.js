import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Image, Platform, View, Clipboard, Button, Switch } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CredentialsContext } from "../components/CredentialsContext";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import {
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

export default function MyPage(props) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl } = storedCredentials;

  const [showEdit, setShowEdit] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);

  const AvatarImg = photoUrl
    ? {
        uri: photoUrl,
      }
    : require("../assets/sample.jpeg");

  const clearLogin = () => {
    AsyncStorage.removeItem("EightCredentials")
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      {showEdit || showCode || showAlarm ? null : (
        <Container>
          <Title>마이 페이지</Title>

          <Avatar resizeMode="cover" source={AvatarImg} />
          <Label3>{name || "Default Name"}</Label3>
          <Label3>{email || "Default Email"}</Label3>
          <Label3></Label3>

          <TestButton onPress={() => setShowEdit(true)}>
            <Label2>수정</Label2>
          </TestButton>
          <TestButton onPress={() => setShowCode(true)}>
            <Label2>코드 복사로 가족들을 초대해주세요!</Label2>
          </TestButton>
          <TestButton onPress={() => setShowAlarm(true)}>
            <Label2>알람 설정</Label2>
          </TestButton>
          <TestButton onPress={() => clearLogin()}>
            <Label2>로그아웃</Label2>
          </TestButton>
          <TestButton onPress={props.navigation.goBack}>
            <Label2>뒤로 가기</Label2>
          </TestButton>

          <StatusBar style="light" />
        </Container>
      )}
      {showEdit ? <EditPage setShow={setShowEdit} setCredentials={setStoredCredentials} credentials={storedCredentials} /> : null}
      {showCode ? <CodePage setShow={setShowCode} /> : null}
      {showAlarm ? <AlarmSwitchPage setShow={setShowAlarm} /> : null}
    </Container>
  );
}

function EditPage(props) {
  const { name, email, photoUrl } = props.credentials;

  const [text, setText] = useState(name);

  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const AvatarImg = photoUrl
    ? {
        uri: photoUrl,
      }
    : require("../assets/sample.jpeg");

  let openImagePickerAsync = async () => {
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
      alert("사진등록성공?");
      //change image sets
    }
  };

  const addDocumentFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result.type !== "cancel") {
      const credentials = {
        name: name,
        email: email,
        photoUrl: result.uri,
      };

      AsyncStorage.setItem("EightCredentials", JSON.stringify(credentials))
        .then(() => {
          props.setCredentials(credentials);
          onToggleSnackBar();
        })
        .catch((error) => {
          alert(" 수정을 완료하지 못했습니다.");
        });
    }
  };

  const EditProfile = () => {
    const credentials = {
      name: text,
      email: email,
      photoUrl: photoUrl,
    };

    AsyncStorage.setItem("EightCredentials", JSON.stringify(credentials))
      .then(() => {
        props.setCredentials(credentials);
        onToggleSnackBar();
      })
      .catch((error) => {
        alert("이미지 수정을 완료하지 못했습니다.");
      });

    // axios
    //   .put("http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080/user/2", formData, config)
    //   .then((res) => {
    //     console.log("프로필 수정 성공");
    //     console.log(JSON.stringify(res));
    //     setImages("http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080/user/2");
    //   })
    //   .catch((err) => console.log("프로필 수정 에러"));
  };

  return (
    <Container>
      <Title>프로필 수정</Title>

      <Avatar resizeMode="cover" source={AvatarImg} />
      <Button title="사진 수정" onPress={() => openImagePickerAsync()} />
      <Label3>{props.name || "Default Name"}</Label3>
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <StyledTextInput value={text} onChangeText={(value) => setText(value)} />
        <Button title="X" onPress={() => setText("")} />
      </View>
      <TestButton
        onPress={() => {
          EditProfile();
        }}
      >
        <Label2>수정</Label2>
      </TestButton>
      <TestButton
        onPress={() => {
          props.setShow(false);
        }}
      >
        <Label2>뒤로 가기</Label2>
      </TestButton>

      <Snackbar visible={visible} duration="2000" onDismiss={onDismissSnackBar}>
        수정 완료
      </Snackbar>
    </Container>
  );
}

function CodePage(props) {
  const [code, setCode] = useState("12345");
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const copyToClipboard = () => {
    Clipboard.setString(code);
  };
  return (
    <Container>
      <Title>홍길동의 스페이스</Title>
      <TouchableOpacity
        onPress={() => {
          copyToClipboard();
          onToggleSnackBar();
        }}
      >
        <Label3>{code}</Label3>
      </TouchableOpacity>
      <TestButton
        onPress={() => {
          props.setShow(false);
        }}
      >
        <Label2>뒤로 가기</Label2>
      </TestButton>

      <Snackbar visible={visible} duration="2000" onDismiss={onDismissSnackBar}>
        복사 완료
      </Snackbar>
    </Container>
  );
}

function AlarmSwitchPage(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <Container>
      <Title>알람 설정</Title>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Label3>게임 시작 알림</Label3>
        <Switch
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Label3>도착 알림</Label3>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Label3>댓글 알림</Label3>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Label3>편지 도착 알림</Label3>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <TestButton
        onPress={() => {
          props.setShow(false);
        }}
      >
        <Label2>뒤로 가기</Label2>
      </TestButton>
    </Container>
  );
}
