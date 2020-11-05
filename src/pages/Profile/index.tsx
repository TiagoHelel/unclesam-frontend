import React, { useCallback, useRef } from 'react';
import {
  FiArrowLeft,
  FiMail,
  FiLock,
  FiUser,
  FiTrello,
  FiFileText,
  FiCheck,
} from 'react-icons/fi';

import { Form } from '@unform/web';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content } from './styles';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';

import getValidationsErrors from '../../utils/getValidationsErrors';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  company: string;
  cnpj: number;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const { user, updateUser, signOut } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          company: Yup.string().required('Empresa obrigatório'),
          // cnpj: Yup.string()
          //   .typeError('Somente números')
          //   .length(14, 'Necessário CNPJ com 14 digítos')
          //   .required('CNPJ obrigatório. Somente números'),
          // email: Yup.string()
          //   .email('Digite um e-mail válido')
          //   .required('E-mail obrigatório'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string()
              .required('Campo obrigatório')
              .min(6, 'No mínimo 6 digítos'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required(),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'As senhas não conferem'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
              old_password,
              password,
              password_confirmation,
            }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Perfil Atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso.',
        });

        history.push('/');
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
          title: 'Erro no atualização do Perfil',
          description:
            'Ocorreu um erro ao atualizar o perfil, tente novamente mais tarde.',
        });
      }
    },
    [addToast, history, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          initialData={{
            name: user.name,
            company: user.company,
            cnpj: user.cnpj,
            email: user.email,
          }}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <h1>Meu Perfil</h1>

          <Input icon={FiUser} type="text" placeholder="Nome" name="name" />

          <Input
            icon={FiTrello}
            type="text"
            placeholder="Empresa"
            name="company"
            readOnly
          />

          <Input
            icon={FiFileText}
            type="text"
            placeholder="CNPJ"
            name="cnpj"
            readOnly
          />

          <Input
            icon={FiMail}
            type="text"
            placeholder="E-mail"
            name="email"
            readOnly
          />

          <Input
            containerStyle={{ marginTop: 24 }}
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
            name="old_password"
          />

          <Input
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
            name="password"
          />

          <Input
            icon={FiCheck}
            type="password"
            placeholder="Confirmar nova senha"
            name="password_confirmation"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
