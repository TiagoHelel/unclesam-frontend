import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory, useLocation, Link } from 'react-router-dom';

import * as Yup from 'yup';

import { Container, Content, AnimationContainer } from './styles';

import logo from '../../assets/logo.jpeg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';
import getValidationsErrors from '../../utils/getValidationsErrors';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const location = useLocation();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'No mínimo 6 digítos'),
          password_confirmation: Yup.string()
            .min(6, 'No mínimo 6 digítos')
            .oneOf([Yup.ref('password')], 'As senhas não conferem'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password: data.password,
          password_confirmation: data.password_confirmation,
          token,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao resetar sua senha, tente novamente mais tarde.',
        });
      }
    },
    [addToast, history, location],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Link to="/">
            <img src={logo} alt="docload" />
          </Link>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
              name="password"
            />

            <Input
              icon={FiLock}
              type="password"
              placeholder="Confirmação da nova senha"
              name="password_confirmation"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default ResetPassword;
