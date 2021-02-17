import React, { useRef, useCallback } from 'react';

import { FiHash, FiType } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Content } from './styles';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';
import Header from '../../../components/Header';

import api from '../../../services/api';

import getValidationsErrors from '../../../utils/getValidationsErrors';

interface NewClassificationFormData {
  account_string: string;
  account_string_description: string;
}

const CreateClassification: React.FC = () => {
  const { signOut } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: NewClassificationFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          account_string: Yup.string().required('Conta obrigatório'),
          account_string_description: Yup.string().required(
            'Descrição obrigatória',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/classifications', data);

        addToast({
          type: 'success',
          title: 'Classificação Criada!',
          description: `A classificação ${data.account_string_description} foi criada com sucesso.`,
        });

        history.push('/console/classificacoes');
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
          <h1>Criar nova classificação</h1>

          <Input
            icon={FiHash}
            type="text"
            placeholder="Conta contábil"
            name="account_string"
          />

          <Input
            icon={FiType}
            type="text"
            placeholder="Descrição"
            name="account_string_description"
          />

          <Button type="submit">Criar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CreateClassification;
