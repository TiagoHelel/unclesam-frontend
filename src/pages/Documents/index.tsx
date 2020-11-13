import React, { useEffect, useState } from 'react';

import { FiEdit } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
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

interface Customers {
  id: string;
  competency_date: string;
  amount: string;
  document_url: string;
}

const Documents: React.FC = () => {
  const { signOut } = useAuth();
  const [customers, setCustomers] = useState<Customers[]>([]);

  const location = useLocation();

  const history = useHistory();

  useEffect(() => {
    async function loadCustomers() {
      try {
        const managedUserId = location.pathname.replace('/documentos/', '');
        const response = await api.get(
          `/documents?managed_user_id=${managedUserId}`,
        );

        response.data.map((customer: Customers) =>
          customer.amount
            ? (customer.amount = Number(customer.amount).toLocaleString(
              'pt-BR',
              {
                minimumFractionDigits: 2,
                style: 'currency',
                currency: 'BRL',
              },
            ))
            : null,
        );

        setCustomers(response.data);
      } catch (err) {
        console.log(err);
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
          <ContentLabel>Documentos</ContentLabel>
          <ButtonHeader onClick={() => history.push('/criar-usuario')}>
            Criar novo usuário de cliente
          </ButtonHeader>
        </ContentHeader>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Data de competência</th>
              <th>Valor</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.competency_date}</td>
                <td>{customer.amount}</td>
                <td>
                  <a target="AWS S3" href={customer.document_url}>
                    <FiEdit />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Container>
  );
};

export default Documents;
