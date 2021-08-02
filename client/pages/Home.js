import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Image, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../components/CredentialsContext";
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

export default function Home({ navigation }) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl } = storedCredentials;
  const [profileImage, setProfileImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState();
  const [text, setText] = useState("");

  useEffect(async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }, []);

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("카메라 허용이 필요합니다!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.cancelled) {
        setProfileImage(response.uri);
      }
    }
  };

  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append("profile", {
      name: new Date() + "_profile",
      uri: profileImage,
      type: "image/jpg",
    });

    alert(formData);

    try {
      const res = await client.post("/upload-profile", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          authorization: `JWT ${token}`,
        },
      });

      if (res.data.success) {
        props.navigation.dispatch(StackActions.replace("UserProfile"));
      }
    } catch (error) {
      console.log(error.message);
    }

    // fetch("http://192.168.2.111:8080/", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   // send our base64 string as POST request
    //   body: JSON.stringify({
    //     imgsource: image.base64,
    //   }),
    // });
  };

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

  const testRequest = () => {
    const data = {
      nickname: name,
      email: email,
      profile: "https://i.ytimg.com/vi/-XFE5KvkIxU/maxresdefault.jpg",
    };
    axios
      .post("http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080/user", data)
      .then((res) => alert(JSON.stringify(res)))
      .catch((err) => alert("에러"));
  };

  const chanageProfileImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    setProfileImage(result.uri);
  };

  const store = async () => {
    const credentials = {
      name: text,
      email: email,
      photoUrl: photoUrl,
    };
    AsyncStorage.setItem("EightCredentials", JSON.stringify(credentials))
      .then(() => {
        setStoredCredentials(credentials);
        alert("수정 완료");
      })
      .catch((error) => {
        alert("이미지 수정을 완료하지 못했습니다.");
      });
  };

  return (
    <Container>
      <StatusBar style="light" />
      <Title>홈 페이지</Title>
      <Avatar resizeMode="cover" source={AvatarImg} />
      <Label3 welcome={true}>{name || "Default Name"}</Label3>
      <Label3 welcome={true}>{email || "Defalt Email"}</Label3>

      <StyledTextInput value={text} onChangeText={(value) => setText(value)}></StyledTextInput>

      <TouchableOpacity onPress={store}>
        <Label3>저장</Label3>
      </TouchableOpacity>
      <Image source={{ uri: profileImage }} style={{ width: 100, height: 100 }} />

      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}

      {/* <TouchableOpacity onPress={openImageLibrary}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={{ width: 100, height: 100 }} />
        ) : (
          <Label3>업로드 프로필 이미지</Label3>
        )}
      </TouchableOpacity> */}
      {profileImage ? <Label3 onPress={uploadProfileImage}>업로드</Label3> : null}
      <TestButton
        onPress={() => {
          navigation.navigate("CreateSpace");
        }}
      >
        <Label2>스페이스 생성</Label2>
      </TestButton>
      <TestButton onPress={testRequest}>
        <Label2>요청테스트</Label2>
      </TestButton>
      <LogOutButton onPress={clearLogin}>
        <Label2>Logout</Label2>
      </LogOutButton>
    </Container>
  );
}
