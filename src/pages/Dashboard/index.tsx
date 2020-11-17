import React, { useEffect, useState } from 'react';

import { FiEdit } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import _ from 'underscore';
import {
  Container,
  Content,
  ContentHeader,
  ButtonHeader,
  ContentLabel,
} from './styles';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import Header from '../../components/Header';

interface Customers {
  id: string;
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const [customers, setCustomers] = useState<Customers[]>([]);

  const history = useHistory();

  useEffect(() => {
    async function loadCustomers() {
      try {
        const response = await api.get('/managedusers');

        const customersList = _.sortBy(response.data, 'name');

        setCustomers(customersList);
      } catch (err) {
        if (err.response.data.message === 'Invalid JWT token') {
          signOut();
        }
      }
    }
    loadCustomers();
  }, [signOut]);

  return (
    <Container>
      <Header />

      <Content>
        <ContentHeader>
          <ContentLabel>Clientes</ContentLabel>
          <ButtonHeader onClick={() => history.push('/criar-usuario')}>
            Criar novo usuário de cliente
          </ButtonHeader>
          <ButtonHeader onClick={() => history.push('/classificacoes')}>
            Gerenciar classificações
          </ButtonHeader>
        </ContentHeader>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>
                  <button
                    type="button"
                    onClick={() => history.push(`/documentos/${customer.id}`)}
                  >
                    {customer.id}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => history.push(`/documentos/${customer.id}`)}
                  >
                    {customer.name}
                  </button>
                </td>
                <td>{customer.email}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => history.push(`/usuarios/${customer.id}`)}
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

export default Dashboard;
