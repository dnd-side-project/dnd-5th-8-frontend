import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Image, Platform, View, Clipboard, Button } from "react-native";
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

export default function MyPage() {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl } = storedCredentials;

  const [showEdit, setShowEdit] = useState(false);
  const [showCode, setShowCode] = useState(false);

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
      {showEdit || showCode ? null : (
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
          <TestButton onPress={() => clearLogin()}>
            <Label2>로그아웃</Label2>
          </TestButton>

          <StatusBar style="light" />
        </Container>
      )}
      {showEdit ? (
        <EditPage setShow={setShowEdit} setCredentials={setStoredCredentials} name={name} email={email} photoUrl={photoUrl} />
      ) : null}
      {showCode ? <CodePage setShow={setShowCode} /> : null}
    </Container>
  );
}

function EditPage(props) {
  const [text, setText] = useState(props.name);

  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    alert(JSON.stringify(pickerResult));
  };

  const x = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result.type !== "cancel") {
      const credentials = {
        name: props.name,
        email: props.email,
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

  const AvatarImg = props.photoUrl
    ? {
        uri: props.photoUrl,
      }
    : require("../assets/sample.jpeg");

  const EditProfile = () => {
    const credentials = {
      name: text,
      email: props.email,
      photoUrl: props.photoUrl,
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
      <Button title="사진 수정" onPress={() => x()} />
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
