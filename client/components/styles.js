import styled from "styled-components";
import { View, Text, TouchableOpacity, TextInput, Image, Switch } from "react-native";
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
  justify-content: center;
  align-items: center;

  background: #090139;
`;
export const MainContainer = styled.View`
  flex: 1;
  background: white;

  justify-content: center;
  align-items: center;

  position: relative;
`;

export const Container2 = styled.View`
  flex: 1;
  background: #170c59;
  padding: 100px 0;
  width: 100%;
`;
export const Container3 = styled.View`
  flex-direction: row;
  align-items: center;
  background: #170c59;
  margin-bottom: 30px;
`;

export const MainTitle = styled.Text`
  position: absolute;
  top: 130px;
  left: 20px;
  font-size: 27px;
  font-weight: 700;
`;
export const Title = styled.Text`
  position: absolute;
  top: 50px;
  font-size: 70px;
  font-weight: bold;
  color: #d5aaff;
`;

export const Title2 = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #d5aaff;
`;

export const GoogleLoginButton = styled.TouchableOpacity`
  width: 90%;
  height: 55px;

  border-radius: 23px;
  border: 1px solid #efe6fd;

  opacity:1

  justify-content: center;
  align-items: center;

  flex-direction: row;

  position:absolute;
  bottom:100px
  
`;

export const StyledTextInput = styled.TextInput`
  flex: 1;
  border-radius: 5px;
  border: 10px solid purple;

  font-size: 25px;
  background: white;
`;

export const MainTextInput = styled.TextInput`
  width: 100%;

  font-size: 23px;
  font-weight: 500;

  border: 3px solid #8442fe;
  border-bottom-color: #8442fe;
  border-top-color: #00ff0000;
  border-left-color: #00ff0000;
  border-right-color: #00ff0000;

  padding: 10px;
`;

export const SpaceButton = styled.TouchableOpacity`
  width: 80%;
  height: 160px;

  justify-content: center;
  align-items: center;

  border-radius: 8px;
`;

export const LabelWhite = styled.Text`
  font-size: 23px;
  font-weight: 500;
  color: white;
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
  font-weight: 600;
  color: #ffffff;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 100px;
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

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${(props) => (props.type == "SUCCESS" ? "#10B981" : "#EF4444")};
`;
