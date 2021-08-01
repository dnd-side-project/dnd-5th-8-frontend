import React from "react";

import Container from "../components/Container";

import styled from "styled-components";

const Title = styled.Text`
  position: absolute;
  top: 200px;
  color: #d5aaff;
  font-size: 100px;
  font-weight: bold;
`;

export default function Home() {
  return (
    <Container>
      <Title>홈 페이지</Title>
    </Container>
  );
}
