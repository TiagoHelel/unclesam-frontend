import React, { useEffect, useState } from 'react';

import { FiEdit, FiPower } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  ContentHeader,
  ButtonHeader,
  ContentLabel,
} from './styles';

import logo from '../../assets/logo.jpeg';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

interface Customers {
  id: string;
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [customers, setCustomers] = useState<Customers[]>([]);

  const history = useHistory();

  useEffect(() => {
    async function loadCustomers() {
      try {
        const response = await api.get('/managedusers');
        console.log(response.data);
        setCustomers(response.data);
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
      <Header>
        <HeaderContent>
          <img src={logo} alt="DocLoad" />

          <Profile>
            <div>
              <span>Bem-vindo</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <ContentHeader>
          <ContentLabel>Clientes</ContentLabel>
          <ButtonHeader onClick={() => history.push('/createuser')}>
            Criar novo usuário de cliente
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
                  <Link to="/profile">{customer.id}</Link>
                </td>
                <td>
                  <Link to="/profile">{customer.name}</Link>
                </td>
                <td>{customer.email}</td>
                <td>
                  <Link to="/profile">
                    <FiEdit />
                  </Link>
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
