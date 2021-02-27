import React from "react";

import {
  Container,
  Background,
  TitleBox,
  Title,
  Content,
  Mobile,
} from "./styles";

import background from "../../../../assets/background.png";
import mobile from "../../../../assets/iphone.png";

const How: React.FC = () => {
  return (
    <Container>
      <Content>
        <Background src={background} />
        <TitleBox>
          <Title>CONEXÃO DIGITAL COM SEU CLIENTE</Title>
        </TitleBox>
        <Mobile src={mobile} />
      </Content>
    </Container>
  );
};

export default How;
