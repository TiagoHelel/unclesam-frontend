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
  Price,
  Contact,
} from "./styles";

const Pricing: React.FC = () => {
  const history = useHistory();

  return (
    <Container id="planos">
      <Title>Planos e Serviços</Title>
      <Content>
        {/* <Details>
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
        </Details> */}
        {/* <Details>
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
        </Details> */}
        <Details>
          <Head>Grátis</Head>
          <Body>
            <p>Crie sua conta grátis</p>
            <Contact> e use o quanto quiser!</Contact>
          </Body>
          <Extension>Até 1 cliente cadastrado</Extension>
          <br />
          {/* <Extension>R$ 0,50 por cliente adicional</Extension> */}
          <br />
          <Button
            onClick={() => {
              history.push("/cadastro");
            }}
          >
            Crie sua conta agora!
          </Button>
        </Details>
        <Details>
          <Head>Premium</Head>
          <Body>
            <Price>R$ 229,99 / ano</Price>
            <p>R$ 119,99 / ano</p>
          </Body>
          <Extension>Até 20 clientes cadastrados</Extension>
          <br />
          {/* <Extension>R$ 0,50 por cliente adicional</Extension> */}
          <br />
          <Button
            onClick={() => {
              history.push("/cadastro");
            }}
          >
            Crie sua conta agora!
          </Button>
        </Details>
        <Details>
          <Head>Customizado</Head>
          <Body>
            <Contact>Precisa de mais clientes cadastrados?</Contact>
            <Contact>Entre em contato conosco!</Contact>
          </Body>
          {/* <Extension>Até 10 clientes cadastrados</Extension> */}
          <br />
          {/* <Extension>R$ 0,50 por cliente adicional</Extension> */}
          <br />
          <Button
            onClick={() => {
              window.location.href = "mailto:contato@docload.com.br";
            }}
          >
            Entrar em contato
          </Button>
        </Details>
      </Content>
    </Container>
  );
};

export default Pricing;
