import React, { useEffect, useState } from 'react';

import { FiEdit } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'underscore';

import {
  Container,
  Content,
  ContentHeader,
  ButtonHeader,
  ContentLabel,
} from './styles';

import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';

import api from '../../services/api';

interface Classifications {
  id: string;
  account_string: string;
  account_string_description: string;
}

const Classifications: React.FC = () => {
  const { signOut } = useAuth();
  const [classifications, setClassifications] = useState<Classifications[]>([]);

  const location = useLocation();

  const history = useHistory();

  useEffect(() => {
    async function loadCustomers() {
      try {
        const response = await api.get(`/classifications`);

        const classificationsList = _.sortBy(response.data, 'account_string');

        setClassifications(classificationsList);
      } catch (err) {
        if (err.response?.data?.message === 'Invalid JWT token') {
          signOut();
        }
      }
    }
    loadCustomers();
  }, [signOut, location]);

  return (
    <Container>
      <Header />

      <Content>
        <ContentHeader>
          <ContentLabel>Classificações</ContentLabel>
          <ButtonHeader onClick={() => history.push('/criar-classificacao')}>
            Criar nova classificação
          </ButtonHeader>
        </ContentHeader>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Conta contábil</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {classifications.map(classification => (
              <tr key={classification.id}>
                <td>{classification.id}</td>
                <td>{classification.account_string}</td>
                <td>{classification.account_string_description}</td>
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      history.push(`/classificacao/${classification.id}`)}
                  >
                    <FiEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Container>
  );
};

export default Classifications;
