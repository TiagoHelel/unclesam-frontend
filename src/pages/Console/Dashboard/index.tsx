import React, { useEffect, useState } from "react";

import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import _ from "underscore";
import {
  Container,
  Content,
  ContentHeader,
  ButtonHeader,
  ContentLabel,
  Actions,
} from "./styles";

import { useAuth } from "../../../hooks/auth";

import api from "../../../services/api";
import Header from "../../../components/Header";

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
        const response = await api.get("/managedusers");

        const customersList = _.sortBy(response.data, "name");

        setCustomers(customersList);
      } catch (err) {
        if (err.response?.data?.message === "Invalid JWT token") {
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
          <ButtonHeader onClick={() => history.push("/console/criar-usuario")}>
            Criar novo usuário de cliente
          </ButtonHeader>
          <ButtonHeader onClick={() => history.push("/console/classificacoes")}>
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
                    onClick={() =>
                      history.push(`/console/documentos/${customer.id}`)
                    }
                  >
                    {customer.id}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      history.push(`/console/documentos/${customer.id}`)
                    }
                  >
                    {customer.name}
                  </button>
                </td>
                <td>{customer.email}</td>
                <td>
                  <Actions>
                    <button
                      type="button"
                      onClick={() =>
                        history.push(`/console/usuarios/${customer.id}`)
                      }
                    >
                      <FiEdit />
                    </button>
                    <button type="button" onClick={() => alert("excluir")}>
                      <FiTrash2 color="red" />
                    </button>
                  </Actions>
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
