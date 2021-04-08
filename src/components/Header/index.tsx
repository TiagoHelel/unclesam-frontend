import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiHome, FiPower } from "react-icons/fi";

import api from "../../services/api";

import {
  HeaderContainer,
  HeaderContent,
  Profile,
  Plan,
  CustomButtom,
} from "./styles";

import logo from "../../assets/logofull.jpeg";
import { useAuth } from "../../hooks/auth";

const Header: React.FC = () => {
  const { signOut, user, updateUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    async function loadUser() {
      const response = await api.get("/profile");
      const { plan } = response.data;
      if (plan !== user.plan) {
        user.plan = plan;
        updateUser(user);
      }
    }
    loadUser();
  }, [user, updateUser]);

  const handleUpgradeSignature = useCallback(async () => {
    const response = await api.get("users/subscription");
    const { checkoutUrl } = response.data;

    window.open(checkoutUrl);
  }, []);

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to="/console/dashboard">
          <img src={logo} alt="DocLoad" />
        </Link>

        <Profile>
          <div>
            <span>Bem-vindo</span>
            <Link to="/console/profile">
              <strong>{user.name}</strong>
            </Link>
          </div>
        </Profile>

        <div>
          <strong>
            Plano
            <Plan>
              {' '}
              {`${user.plan[0].toUpperCase()}${user.plan.slice(1)}`}
            </Plan>
            {user.plan === "free" ? (
              <CustomButtom onClick={handleUpgradeSignature}>
                Upgrade para Premium
              </CustomButtom>
            ) : null}
          </strong>
          <button
            type="button"
            onClick={() => history.push("/console/dashboard")}
          >
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
