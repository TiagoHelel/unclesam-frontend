import React, { useCallback, useEffect, useState } from "react";

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
import { useToast } from "../../../hooks/toast";

import api from "../../../services/api";
import Header from "../../../components/Header";
import Modal from "../../../components/Modal";

interface Customers {
  id: string;
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const [customers, setCustomers] = useState<Customers[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [managedUserEmailToDelete, setManagedUserEmailToDelete] = useState("");

  const history = useHistory();
  const { addToast } = useToast();

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

  const handleDeleteManagedUser = useCallback((email: string) => {
    setShowModal(true);
    setManagedUserEmailToDelete(email);
  }, []);

  const submitModal = useCallback(async () => {
    try {
      await api.delete(`/managedusers?email=${managedUserEmailToDelete}`);

      addToast({
        type: "success",
        title: "Usuário deletado com sucesso!",
        description: `O usuário e seus documentos enviados foram excluidos da base.`,
      });
      setManagedUserEmailToDelete("");
      window.location.reload();
    } catch (err) {
      if (err.response.data.message === "Invalid JWT token") {
        signOut();
        return;
      }

      addToast({
        type: "error",
        title: "Erro ao deletar o usuário!",
        description:
          "Ocorreu um erro ao deleter o usuário, tente novamente mais tarde.",
      });
    }
  }, [addToast, signOut, managedUserEmailToDelete]);

  return (
    <Container>
      <Header />
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        message={`Tem certeza que deseja deletar o usuário? \nTodos os documentos enviados por ele serão excluídos também!`}
        onYes={() => submitModal()}
      >
        <Content>
          <ContentHeader>
            <ContentLabel>Clientes</ContentLabel>
            <ButtonHeader
              onClick={() => history.push("/console/criar-usuario")}
            >
              Criar novo usuário de cliente
            </ButtonHeader>
            <ButtonHeader
              onClick={() => history.push("/console/classificacoes")}
            >
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
                      <button
                        type="button"
                        onClick={() => handleDeleteManagedUser(customer.email)}
                      >
                        <FiTrash2 color="red" />
                      </button>
                    </Actions>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Content>
      </Modal>
    </Container>
  );
};

export default Dashboard;
