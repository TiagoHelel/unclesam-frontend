import React, { useRef, useCallback, useState, useEffect } from 'react';

import { FiUser, FiMail, FiLock, FiCheck } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
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
  password_confirmation: string;
}

interface ManagedUsers {
  name: string;
  email: string;
}

const UpdateManagedUser: React.FC = () => {
  const { signOut } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const [managedUser, setManagedUser] = useState<ManagedUsers>(
    {} as ManagedUsers,
  );

  const location = useLocation();

  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    async function loadCustomer() {
      try {
        const managedUserId = location.pathname.replace('/usuarios/', '');
        const response = await api.get(
          `/profilemanagedusers?user_id=${managedUserId}`,
        );

        setManagedUser(response.data);
      } catch (err) {
        if (err.response?.data?.message === 'Invalid JWT token') {
          signOut();
        }
      }
    }
    loadCustomer();
  }, [signOut, location]);

  const handleSubmit = useCallback(
    async (data: NewUserFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          old_password: Yup.string(),
          password: Yup.string(),
          password_confirmation: Yup.string()
            .when('password', {
              is: val => !!val.length,
              then: Yup.string()
                .required('Campo obrigatório')
                .min(6, 'No mínimo 6 digítos'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'As senhas não conferem'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, password, password_confirmation } = data;

        const formData = {
          name,
          email,
          ...(password
            ? {
              password,
              password_confirmation,
            }
            : {}),
        };

        const managedUserId = location.pathname.replace('/usuarios/', '');
        await api.put(
          `/profilemanagedusers?user_id=${managedUserId}`,
          formData,
        );

        addToast({
          type: 'success',
          title: 'Usuário Atualizado!',
          description: `O usuário ${data.name} foi atualizado com sucesso.`,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        if (err.response?.data.message === 'Invalid JWT token') {
          signOut();
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização do usuário',
          description: 'O e-mail já está sendo utilizado.',
        });
      }
    },
    [addToast, history, signOut, location.pathname],
  );

  return (
    <Container>
      <Header />

      <Content>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: managedUser.name,
            email: managedUser.email,
          }}
        >
          <h1>Atualizar usuário de cliente</h1>

          <Input icon={FiUser} type="text" placeholder="Nome" name="name" />

          <Input icon={FiMail} type="text" placeholder="E-mail" name="email" />

          <Input
            icon={FiLock}
            type="password"
            placeholder="Digite uma nova senha [Opcional]"
            name="password"
          />

          <Input
            icon={FiCheck}
            type="password"
            placeholder="Confirmar nova senha [Opcional]"
            name="password_confirmation"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default UpdateManagedUser;
