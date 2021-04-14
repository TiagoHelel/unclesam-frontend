import React from "react";
import { useHistory } from "react-router-dom";

import logo from "../../../../assets/logo.png";

import { Container, LogoBox, Logo, Name, Email, Slogan } from "./styles";

const Footer: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <LogoBox>
        <Logo
          src={logo}
          alt="logo"
          onClick={() => {
            history.push("/");
          }}
        />
        <Name>DocLoad</Name>
        <Slogan>CONEXÃO DIGITAL COM SEU CLIENTE</Slogan>
      </LogoBox>
      <Email
        onClick={() => {
          window.location.href = "mailto:contato@docload.com.br";
        }}
      >
        contato@docload.com.br
      </Email>
    </Container>
  );
};

export default Footer;
