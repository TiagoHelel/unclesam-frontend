import React from 'react';

import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container, Header, HeaderContent, Profile } from './styles';

import logo from '../../assets/logo.jpeg';
import { useAuth } from '../../hooks/auth';

const CreateManagedUser: React.FC = () => {
  const { signOut, user } = useAuth();

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
    </Container>
  );
};

export default CreateManagedUser;
