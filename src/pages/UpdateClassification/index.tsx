import React, { useRef, useCallback, useState, useEffect } from 'react';

import { FiHash, FiType } from 'react-icons/fi';
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

interface Classifications {
  account_string: string;
  account_string_description: string;
}

const UpdateClassification: React.FC = () => {
  const { signOut } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const [classification, setClassification] = useState<Classifications>(
    {} as Classifications,
  );

  const location = useLocation();

  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    async function loadClassification() {
      try {
        const classificationId = location.pathname.replace(
          '/classificacao/',
          '',
        );
        const response = await api.get(
          `/classification?classification_id=${classificationId}`,
        );

        setClassification(response.data);
      } catch (err) {
        if (err.response?.data?.message === 'Invalid JWT token') {
          signOut();
        }
      }
    }
    loadClassification();
  }, [signOut, location]);

  const handleSubmit = useCallback(
    async (data: Classifications) => {
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

        const classification_id = location.pathname.replace(
          '/classificacao/',
          '',
        );

        const formData = {
          classification_id,
          account_string: data.account_string,
          account_string_description: data.account_string_description,
        };

        await api.put('/classification', formData);

        addToast({
          type: 'success',
          title: 'Classificação Atualizada!',
          description: `A classificação ${data.account_string_description} foi atualizada com sucesso.`,
        });

        history.push('/classificacoes');
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
          title: 'Erro na atualização da classificação',
          description: 'A conta contábil já está sendo utilizada.',
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
            account_string: classification.account_string,
            account_string_description:
              classification.account_string_description,
          }}
        >
          <h1>Atualizar classificação</h1>

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

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default UpdateClassification;
