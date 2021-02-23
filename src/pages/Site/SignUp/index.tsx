import React, { useCallback, useRef } from "react";
import {
  FiArrowLeft,
  FiMail,
  FiLock,
  FiUser,
  FiTrello,
  FiFileText,
  FiCheck,
} from "react-icons/fi";

import { Form } from "@unform/web";

import * as Yup from "yup";
import { FormHandles } from "@unform/core";
import { Link, useHistory } from "react-router-dom";
import { Container, Content, AnimationContainer } from "./styles";

import logo from "../../../assets/logofull.jpeg";

import api from "../../../services/api";

import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { useToast } from "../../../hooks/toast";

import getValidationsErrors from "../../../utils/getValidationsErrors";

interface SingUpFormData {
  name: string;
  company: string;
  cnpj: number;
  email: string;
  password: string;
  confirm_password: string;
}

const SingUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SingUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          company: Yup.string().required("Empresa obrigatório"),
          cnpj: Yup.string()
            .typeError("Somente números")
            .length(14, "Necessário CNPJ com 14 digítos")
            .required("CNPJ obrigatório. Somente números"),
          email: Yup.string()
            .email("Digite um e-mail válido")
            .required("E-mail obrigatório"),
          password: Yup.string().min(6, "No mínimo 6 digítos"),
          confirm_password: Yup.string()
            .min(6, "No mínimo 6 digítos")
            .oneOf([Yup.ref("password")], "As senhas não conferem"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("users", data);

        addToast({
          type: "success",
          title: "Cadastro realizado",
          description: "Você já pode fazer seu logon na DocLoad.",
        });

        history.push("/console");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Erro no cadastro",
          description:
            "Ocorreu um erro ao fazer o cadastro, cheque seus dados.",
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="docload" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input icon={FiUser} type="text" placeholder="Nome" name="name" />

            <Input
              icon={FiTrello}
              type="text"
              placeholder="Empresa"
              name="company"
            />

            <Input
              icon={FiFileText}
              type="text"
              placeholder="CNPJ"
              name="cnpj"
            />

            <Input
              icon={FiMail}
              type="text"
              placeholder="E-mail"
              name="email"
            />

            <Input
              icon={FiLock}
              type="password"
              placeholder="Senha"
              name="password"
            />

            <Input
              icon={FiCheck}
              type="password"
              placeholder="Repita sua senha"
              name="confirm_password"
            />

            <Button type="submit">Criar conta</Button>
          </Form>

          <Link to="/console">
            <FiArrowLeft />
            Já tenho conta
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SingUp;
