import React from "react";

import {
  Container,
  Background,
  TitleBox,
  Title,
  Content,
  Mobile,
  Subtitle,
} from "./styles";

import background from "../../../../assets/background2.png";
import mobile from "../../../../assets/iphone.png";

const How: React.FC = () => {
  return (
    <Container>
      <Content>
        <Background src={background} />
        <TitleBox>
          <Title>CONEXÃO DIGITAL COM SEU CLIENTE</Title>
          <Subtitle>COMO FUNCIONA</Subtitle>
        </TitleBox>
        <Mobile src={mobile} />
      </Content>
    </Container>
  );
};

export default How;
