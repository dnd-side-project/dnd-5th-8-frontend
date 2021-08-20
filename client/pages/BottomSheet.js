import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

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

export default function BS(props) {
  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 450,
      }}
    >
      <Label>데일리퀘스쳔 배달왔음</Label>
    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <>
      <Container>
        <Button title="바텀 시트 열려라" onPress={() => sheetRef.current.snapTo(0)} />
      </Container>
      <BottomSheet ref={sheetRef} snapPoints={[100, 450, 100]} borderRadius={10} renderContent={renderContent} />
    </>
  );
}
