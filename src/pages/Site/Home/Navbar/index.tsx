import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

import logo from "../../../../assets/logo.png";

import {
  Container,
  LogoBox,
  Logo,
  Name,
  Buttons,
  CustomButton,
} from "./styles";

const Navbar: React.FC = () => {
  const [border, setBorder] = useState("none");
  const [color, setColor] = useState("none");

  const history = useHistory();

  const changeColor = useCallback(() => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setBorder("1px solid #0b1c58");
      setColor("#130e2e");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setBorder("none");
      setColor("none");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, [changeColor]);

  return (
    <Container border={border} color={color}>
      <LogoBox>
        <Logo
          src={logo}
          alt="logo"
          onClick={() => {
            history.push("/");
          }}
        />
        <Name>DocLoad</Name>
      </LogoBox>
      <Buttons>
        <CustomButton
          onClick={() => {
            history.push("/console");
          }}
        >
          <p>Login</p>
        </CustomButton>
        <CustomButton
          onClick={() => {
            history.push("/cadastro");
          }}
        >
          <p>Criar conta</p>
        </CustomButton>
      </Buttons>
    </Container>
  );
};

export default Navbar;
