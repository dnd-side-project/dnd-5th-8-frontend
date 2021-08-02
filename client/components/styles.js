import styled from "styled-components";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import Constants from "expo-constants";

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
  primary: "#ffffff",
  secondary: "#E5E7EB",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#6D28D9",
  green: "#10B981",
  red: "#EF4444",
};

export const Container = styled.View`
  flex: 1;
  background: #170c59;

  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  position: absolute;
  top: 50px;
  font-size: 100px;
  font-weight: bold;
  color: #d5aaff;
`;

export const Title2 = styled.Text`
  position: absolute;
  top: 50px;
  font-size: 50px;
  font-weight: bold;
  color: #d5aaff;
`;

export const KakaoLoginButton = styled.TouchableOpacity`
  width: 297px;
  height: 45px;

  background: #fae100;
  border-radius: 80px;

  justify-content: center;
  align-items: center;

  margin-top: 100px;
`;

export const GoogleLoginButton = styled.TouchableOpacity`
  width: 297px;
  height: 45px;

  background: #ffffff;
  border-radius: 80px;

  justify-content: center;
  align-items: center;

  margin-top: 20px;
`;

export const SignUp = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  margin-top: 20px;
`;

export const StyledTextInput = styled.TextInput`
  width: 200px;
  background-color: white;
  margin: 15px;
  padding: 15px;
  border-radius: 5px;
  font-size: 25px;
  height: 60px;
  color: green;
`;

export const SpaceButton = styled.TouchableOpacity`
  width: 80%;
  height: 160px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
export const Label2 = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
`;
export const Label3 = styled.Text`
  font-size: 23px;
  font-weight: bold;
  color: #ffffff;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50px;
  border-width: 2px;
  border-color: #e5e7eb;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const TestButton = styled.TouchableOpacity`
  width: 297px;
  height: 45px;

  background: #fae100;
  border-radius: 80px;

  justify-content: center;
  align-items: center;

  margin: 10px;
`;

export const LogOutButton = styled.TouchableOpacity`
  width: 297px;
  height: 45px;

  background: #fae100;
  border-radius: 80px;

  justify-content: center;
  align-items: center;

  margin: 10px;
`;
