import React from "react";

import { useHistory } from "react-router-dom";
import { Container, Titlebox, Rectangle, Title, Subtitle } from "./styles";

import Button from "../../../../components/Button";

const Main: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <Rectangle>
        <Titlebox>
          <Title>DocLoad</Title>
          <Subtitle>
            Avance na forma como você recebe os documentos de seus clientes.
          </Subtitle>
          <Button onClick={() => history.push("/cadastro")}>
            Crie sua conta já!
          </Button>
        </Titlebox>
      </Rectangle>
    </Container>
  );
};

export default Main;
