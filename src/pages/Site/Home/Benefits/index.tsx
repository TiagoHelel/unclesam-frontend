import React from "react";

import {
  RiHandHeartLine,
  RiAccountPinCircleLine,
  RiUserSmileLine,
  RiMoneyDollarCircleLine,
  RiPlantLine,
  RiTimer2Line,
  RiShieldStarLine,
} from "react-icons/ri";

import {
  Container,
  // Background,
  Content,
  Title,
  TitleBox,
  Circle,
  CircleLabel,
} from "./styles";

// import background from "../../../../assets/background2.png";

const Benefits: React.FC = () => {
  return (
    <Container>
      {/* <Background src={background} /> */}
      <Content>
        <TitleBox>
          <Title>AGREGANDO VALOR AOS NEGÓCIOS E CLIENTES</Title>
          <RiHandHeartLine size="27.6vmin" color="#6182c7" />
        </TitleBox>
        <ul>
          <CircleLabel>Foco no cliente</CircleLabel>
          <CircleLabel />
          <CircleLabel>Redução de custos</CircleLabel>
          <CircleLabel />
          <CircleLabel>Otimização do tempo</CircleLabel>
          <CircleLabel />
        </ul>
        <ul>
          <Circle>
            <RiAccountPinCircleLine size="9.6vmin" color="#6182c7" />
          </Circle>
          <Circle>
            <RiUserSmileLine size="9.6vmin" color="#6182c7" />
          </Circle>
          <Circle>
            <RiMoneyDollarCircleLine size="9.6vmin" color="#6182c7" />
          </Circle>
          <Circle>
            <RiPlantLine size="9.6vmin" color="#6182c7" />
          </Circle>
          <Circle>
            <RiTimer2Line size="9.6vmin" color="#6182c7" />
          </Circle>
          <Circle>
            <RiShieldStarLine size="9.6vmin" color="#6182c7" />
          </Circle>
        </ul>
        <ul>
          <CircleLabel />
          <CircleLabel>Otimização do processo</CircleLabel>
          <CircleLabel />
          <CircleLabel>Processo sustentável</CircleLabel>
          <CircleLabel />
          <CircleLabel>Maximização do quality</CircleLabel>
        </ul>
      </Content>
    </Container>
  );
};

export default Benefits;
