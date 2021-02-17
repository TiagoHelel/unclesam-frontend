import React from "react";

import { Container, Title, Content, Details } from "./styles";

const Pricing: React.FC = () => {
  return (
    <Container>
      <Title>Planos e Serviços</Title>
      <Content>
        <Details>Figura 1</Details>
        <Details>Figura 2</Details>
        <Details>Figura 3</Details>
      </Content>
    </Container>
  );
};

export default Pricing;
