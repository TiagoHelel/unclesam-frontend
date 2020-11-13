import React, { useRef, useCallback } from 'react';

import { FiUser, FiMail, FiLock, FiCheck } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Content } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import Header from '../../components/Header';

import api from '../../services/api';

import getValidationsErrors from '../../utils/getValidationsErrors';

interface NewUserFormData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const CreateManagedUser: React.FC = () => {
  const { signOut } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: NewUserFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6 digítos'),
          confirm_password: Yup.string().oneOf(
            [Yup.ref('password')],
            'As senhas não conferem',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/managedusers', data);

        addToast({
          type: 'success',
          title: 'Usuário Criado!',
          description: `O usuário ${data.name} foi criado com sucesso.`,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        if (err.response.data.message === 'Invalid JWT token') {
          signOut();
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na criação do usuário',
          description: 'O e-mail já está sendo utilizado.',
        });
      }
    },
    [addToast, history, signOut],
  );

  return (
    <Container>
      <Header />

      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Criar novo usuário de cliente</h1>

          <Input icon={FiUser} type="text" placeholder="Nome" name="name" />

          <Input icon={FiMail} type="text" placeholder="E-mail" name="email" />

          <Input
            icon={FiLock}
            type="password"
            placeholder="Digite a senha"
            name="password"
          />

          <Input
            icon={FiCheck}
            type="password"
            placeholder="Confirmar senha"
            name="confirm_password"
          />

          <Button type="submit">Criar</Button>
          <Link to="/dashboard">
            <Button type="button">Voltar ao Dashboard</Button>
          </Link>
        </Form>
      </Content>
    </Container>
  );
};

export default CreateManagedUser;
