import React from "react";

import { useHistory } from "react-router-dom";
import {
  Container,
  Background,
  Titlebox,
  Rectangle,
  Title,
  Subtitle,
} from "./styles";

import Button from "../../../../components/Button";

import background from "../../../../assets/background.png";

const Main: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <Background src={background} />
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
