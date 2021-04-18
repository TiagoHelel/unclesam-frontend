import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Container, Content, AnimationContainer } from "./styles";

import logo from "../../../assets/logofull.jpeg";

import api from "../../../services/api";

interface UserData {
  name: string;
}

const ActivateUser: React.FC = () => {
  const [user, setUser] = useState({} as UserData);

  const location = useLocation();

  useEffect(() => {
    const activateUser = async () => {
      const token = location.search.replace("?token=", "");

      if (!token) {
        throw new Error();
      }
      try {
        const response = await api.post("/users/activate", {
          token,
        });

        setUser(response.data);
      } catch {
        setUser({} as UserData);
      }
    };

    activateUser();
  }, [location]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Link to="/">
            <img src={logo} alt="docload" />
          </Link>
          {user.name ? (
            <>
              <h1>
                Olá
                <strong> {user.name}</strong>
              </h1>
              <h1>Sua conta foi ativada com sucesso!</h1>
              <Link to="/">
                <h1>Acessar a DocLoad agora!</h1>
              </Link>
            </>
          ) : (
            <>
              <h1>Erro =(</h1>
              <h1>Usuário não encontrado!</h1>
            </>
          )}
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default ActivateUser;
