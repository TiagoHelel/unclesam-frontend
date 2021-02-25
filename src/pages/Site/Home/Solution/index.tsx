import React from "react";

import { Container, Background, Content, Details } from "./styles";

import background from "../../../../assets/background3.png";

const Solution: React.FC = () => {
  return (
    <Container>
      <Background src={background} />
      <Content>
        <Details>
          Uso do aplicativo DocLoad para captura de imagens de documentos,
          classificação do movimento e compartilhamento on time com a
          contabilidade.
        </Details>
        <Details>
          Dados e imagens capturadas, armazenadas e disponibilizadas em ambiente
          seguro 24 horas por dia.
        </Details>
        <Details>
          Governança total da Contabilidade sobre as informações obtidas e aptas
          para extração e integração a qualquer ERP.
        </Details>
      </Content>
    </Container>
  );
};

export default Solution;
