import React from "react";

import { Container, Title, Content, Details } from "./styles";

const Contact: React.FC = () => {
  return (
    <Container>
      <Title>Dúvidas ? Entre em contato</Title>
      <Content>
        <Details>Figura 1</Details>
        <Details>Figura 2</Details>
      </Content>
    </Container>
  );
};

export default Contact;
