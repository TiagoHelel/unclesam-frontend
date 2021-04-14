import React from "react";
import { RiEmotionLine } from "react-icons/ri";

import { Container, Title, Content, Email, HappyMessage } from "./styles";

const Contact: React.FC = () => {
  return (
    <Container>
      <Title>Dúvidas ? Entre em contato</Title>
      <Content>
        <Email
          onClick={() => {
            window.location.href = "mailto:contato@docload.com.br";
          }}
        >
          Fale conosco em contato@docload.com.br
        </Email>
        <HappyMessage>
          Estamos ansiosos para te atender!
          <RiEmotionLine size="5vmin" color="#6182c7" />
        </HappyMessage>
      </Content>
    </Container>
  );
};

export default Contact;
