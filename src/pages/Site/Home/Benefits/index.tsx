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
} from "./styles";

// import background from "../../../../assets/background2.png";

const Benefits: React.FC = () => {
  return (
    <Container>
      {/* <Background src={background} /> */}
      <Content>
        <TitleBox>
          <Title>AGREGANDO VALOR AOS NEGÓCIOS E CLIENTES</Title>
          <RiHandHeartLine size="276" color="#6182c7" />
        </TitleBox>
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
      </Content>
    </Container>
  );
};

export default Benefits;
