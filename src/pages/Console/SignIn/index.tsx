import React, { useCallback, useRef } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Link, useHistory } from "react-router-dom";

import * as Yup from "yup";

import { Container, Logo, Content, AnimationContainer } from "./styles";

import logo from "../../../assets/logofull.jpeg";

import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { useAuth } from "../../../hooks/auth";
import { useToast } from "../../../hooks/toast";
import getValidationsErrors from "../../../utils/getValidationsErrors";

interface SignInFormData {
  email: string;
  password: string;
}

interface UserData {
  active: boolean;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email("Digite um e-mail válido")
            .required("E-mail obrigatório"),
          password: Yup.string().required("Senha obrigatória"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const isActivated = await signIn({
          email: data.email,
          password: data.password,
        });

        if (!isActivated) {
          addToast({
            type: "error",
            title: "Erro na autenticação",
            description:
              "Usuário não ativado. Por favor, cheque seu e-mail e ative seu cadastro.",
          });
          return;
        }

        history.push("/dashboard");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Erro na autenticação",
          description: "Ocorreu um erro ao fazer login, cheque as credenciais.",
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Logo src={logo} alt="docload" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <Input
              icon={FiMail}
              type="text"
              placeholder="E-mail"
              name="email"
              readonly={false}
            />

            <Input
              icon={FiLock}
              type="password"
              placeholder="Sua senha"
              name="password"
              readonly={false}
            />

            <Button type="submit">Entrar</Button>

            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Form>

          <a href="https://docload.com.br/cadastro">
            <FiLogIn />
            Cria conta
          </a>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
