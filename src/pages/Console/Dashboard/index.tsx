import React, { useCallback, useEffect, useRef, useState } from "react";

import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useHistory } from "react-router-dom";
// import _ from "underscore";
import {
  Container,
  Content,
  ContentHeader,
  ButtonHeader,
  ContentLabel,
  Actions,
  // Expired,
  VideoShow,
} from "./styles";

// import { useAuth } from "../../../hooks/auth";
// import { useToast } from "../../../hooks/toast";

// import api from "../../../services/api";
import Header from "../../../components/Header";
// import Modal from "../../../components/Modal";

import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";
// import { invokeSaveAsDialog } from "recordrtc";

interface Customers {
  id: string;
  name: string;
  email: string;
}

export const useRecorderPermission = (
  recordingType: RecordRTC.Options["type"]
) => {

  const [recorder, setRecorder] = useState<any>();

  useEffect(() => {
    const getPermissionInitializeRecorder = async () => {
      let stream = await (navigator as any).mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      let recorder = new RecordRTCPromisesHandler(stream, {
        type: recordingType,
      });
      setRecorder(recorder);
    };
    getPermissionInitializeRecorder();
  }, [recordingType]);

  return recorder;
};

const Dashboard: React.FC = () => {
  // const { signOut } = useAuth();
  // const [customers, setCustomers] = useState<Customers[]>([]);

  const customers = [{ id: '1111', name: "Tiago da Silva", email: "2022-09-12", expired: false }]

  const [recorderState, setRecorderState] = useState(false)

  // const [showModal, setShowModal] = useState(false);
  // const [managedUserEmailToDelete, setManagedUserEmailToDelete] = useState("");

  const history = useHistory();
  // const { addToast } = useToast();
  // const { user } = useAuth();

  const recorder = useRecorderPermission("video");
  const refVideo = useRef<HTMLVideoElement>(null)

  const startRecording = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (refVideo.current) {
      refVideo.current.requestFullscreen()
      refVideo.current.srcObject = mediaStream
    }
    recorder.startRecording();
    setRecorderState(true)
  };

  const stopRecording = useCallback(async () => {
    if (recorderState) {
      console.log("aqui2")
      let state = await recorder.getState();
      if (state === "recording") {
        await recorder.stopRecording();
        if (refVideo.current) {
          refVideo.current.srcObject = null
        }
        let blob = await recorder.getBlob();
        let videoUrl = URL.createObjectURL(blob);
        if (refVideo.current) {
          refVideo.current.src = videoUrl
        }
      }
    }
    // invokeSaveAsDialog(blob, `random_name.webm`);
  }, [recorderState, recorder]);

  // const stopRecording2 = useCallback(async () => {
  //   stopRecording()
  // }, [recorderState]);

  // useEffect(() => {
  //   async function addEventListener() {
  //     // document.addEventListener('fullscreenchange', stopRecording2, false);
  //     // document.addEventListener('mozfullscreenchange', stopRecording, false);
  //     // document.addEventListener('MSFullscreenChange', stopRecording, false);
  //     // document.addEventListener('webkitfullscreenchange', stopRecording, false);
  //     // }
  //   }
  //   addEventListener()
  // }, [recorderState]);

  // useEffect(() => {
  //   async function loadCustomers() {
  //     try {
  //       const response = await api.get("/managedusers");

  //       const customersList = _.sortBy(response.data, "name");

  //       setCustomers(customersList);
  //     } catch (err) {
  //       if (err.response?.data?.message === "Invalid JWT token") {
  //         signOut();
  //       }
  //       if (err.message === "Network Error") {
  //         window.location.reload();
  //       }
  //     }
  //   }
  //   loadCustomers();
  // }, [signOut]);

  // const handleDeleteManagedUser = useCallback((email: string) => {
  //   setShowModal(true);
  //   setManagedUserEmailToDelete(email);
  // }, []);

  // const submitModal = useCallback(async () => {
  //   try {
  //     await api.delete(`/managedusers?email=${managedUserEmailToDelete}`);

  //     addToast({
  //       type: "success",
  //       title: "Usu??rio deletado com sucesso!",
  //       description: `O usu??rio e seus documentos enviados foram excluidos da base.`,
  //     });
  //     setManagedUserEmailToDelete("");
  //     window.location.reload();
  //   } catch (err) {
  //     if (err.response.data.message === "Invalid JWT token") {
  //       signOut();
  //       return;
  //     }

  //     addToast({
  //       type: "error",
  //       title: "Erro ao deletar o usu??rio!",
  //       description:
  //         "Ocorreu um erro ao deleter o usu??rio, tente novamente mais tarde.",
  //     });
  //   }
  // }, [addToast, signOut, managedUserEmailToDelete]);

  return (
    <Container>
      <Header />
      {/* <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        message={`Tem certeza que deseja deletar o usu??rio? \nTodos os documentos enviados por ele ser??o exclu??dos tamb??m!`}
        onYes={() => submitModal()}
      > */}
      {/* {!user.expired ? ( */}
      <Content>
        <ContentHeader>
          <ContentLabel>Clientes</ContentLabel>
          <ButtonHeader onClick={() => startRecording()}>
            Gravar
              </ButtonHeader>
          <ButtonHeader onClick={() => stopRecording()}>
            Parar
              </ButtonHeader>
          {/* <ButtonHeader onClick={() => history.push("/classificacoes")}>
                Gerenciar classifica????es
              </ButtonHeader> */}
        </ContentHeader>
        <VideoShow controls autoPlay ref={refVideo} />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Data</th>
              <th>A????es</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      history.push(`/documentos/${customer.id}`)
                    }
                  >
                    {customer.id}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      history.push(`/documentos/${customer.id}`)
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
                        history.push(`/usuarios/${customer.id}`)
                      }
                    >
                      <FiEdit />
                    </button>
                    <button
                      type="button"
                    // onClick={() =>
                    //   handleDeleteManagedUser(customer.email)}
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
      {/* ) : ( */}
      {/* <Expired> */}
      {/* <p>Seu acesso expirou. Fa??a o upgrade para o plano Premium j??!</p> */}
      {/* </Expired> */}
      {/* )} */}
      {/* </Modal> */}
    </Container>
  );
};

export default Dashboard;
