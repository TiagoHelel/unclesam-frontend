import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../../../components/Button";

import {
  Container,
  Title,
  Content,
  Details,
  Head,
  Body,
  Extension,
} from "./styles";

const Pricing: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <Title>Planos e Serviços</Title>
      <Content>
        <Details>
          <Head>Mensal</Head>
          <Body>
            <p>R$ 20,99 / mês</p>
          </Body>
          <Extension>Até 10 clientes cadastrados</Extension>
          <br />
          <Extension>R$ 0,50 por cliente adicional</Extension>
          <br />
          <Button
            onClick={() => {
              history.push("/cadastro");
            }}
          >
            Assinar já!
          </Button>
        </Details>
        <Details>
          <Head>Semestral</Head>
          <Body>
            <p>R$ 15,99 / mês</p>
          </Body>
          <Extension>Até 10 clientes cadastrados</Extension>
          <br />
          <Extension>R$ 0,50 por cliente adicional</Extension>
          <br />
          <Button
            onClick={() => {
              history.push("/cadastro");
            }}
          >
            Assinar já!
          </Button>
        </Details>
        <Details>
          <Head>Anual</Head>
          <Body>
            <p>R$ 10,99 / mês</p>
          </Body>
          <Extension>Até 10 clientes cadastrados</Extension>
          <br />
          <Extension>R$ 0,50 por cliente adicional</Extension>
          <br />
          <Button
            onClick={() => {
              history.push("/cadastro");
            }}
          >
            Assinar já!
          </Button>
        </Details>
      </Content>
    </Container>
  );
};

export default Pricing;
