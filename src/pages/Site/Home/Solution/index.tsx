import React from "react";

import {
  RiSpaceShipLine,
  RiDatabase2Line,
  RiFileShield2Line,
} from "react-icons/ri";

import {
  Container,
  // Background,
  Content,
  Title,
  DetailsContainer,
  DetailsText,
  Details,
} from "./styles";

// import background from "../../../../assets/background3.png";

const Solution: React.FC = () => {
  return (
    <Container>
      {/* <Background src={background} /> */}
      <Content>
        <Title>Como funciona</Title>
        <DetailsContainer>
          <Details>
            <RiSpaceShipLine size="48" color="#6182c7" />
            <DetailsText>
              Uso do aplicativo DocLoad para captura de imagens de documentos,
              classificação do movimento e compartilhamento on time com a
              contabilidade.
            </DetailsText>
          </Details>
          <Details>
            <RiDatabase2Line size="48" color="#6182c7" />
            <DetailsText>
              Dados e imagens capturadas, armazenadas e disponibilizadas em
              ambiente seguro 24 horas por dia.
            </DetailsText>
          </Details>
          <Details>
            <RiFileShield2Line size="48" color="#6182c7" />
            <DetailsText>
              Governança total da Contabilidade sobre as informações obtidas e
              aptas para extração e integração a qualquer ERP.
            </DetailsText>
          </Details>
        </DetailsContainer>
      </Content>
    </Container>
  );
};

export default Solution;
