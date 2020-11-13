import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiHome, FiPower } from 'react-icons/fi';

import { HeaderContainer, HeaderContent, Profile } from './styles';
import logo from '../../assets/logo.jpeg';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();
  const history = useHistory();
  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to="/dashboard">
          <img src={logo} alt="DocLoad" />
        </Link>

        <Profile>
          <div>
            <span>Bem-vindo</span>
            <Link to="/profile">
              <strong>{user.name}</strong>
            </Link>
          </div>
        </Profile>

        <div>
          <button type="button" onClick={() => history.push('/dashboard')}>
            <FiHome />
          </button>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </div>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
