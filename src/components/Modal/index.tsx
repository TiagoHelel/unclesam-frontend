import React, { useCallback, useState } from 'react';

import { Container, Modal, Buttons, Space, ButtonDeactivated } from './styles';

import Button from '../Button';

interface ModalProps {
  onClose: Function;
  onYes: Function;
  show: boolean;
  message: string;
}

const Model: React.FC<ModalProps> = ({
  onClose,
  onYes,
  show,
  message,
  children,
}) => {
  const [loading, setLoading] = useState(false);

  const handleYes = useCallback(() => {
    try {
      setLoading(true);
      onYes();
    } finally {
      setLoading(false);
      onClose();
    }
  }, [onClose, onYes]);

  if (!show) {
    return <div>{children}</div>;
  }
  return (
    <Container>
      <Modal>
        {message}

        <Buttons>
          <Button loading={loading} onClick={handleYes}>
            Sim
          </Button>
          <Space />
          {loading ? (
            <ButtonDeactivated>Não</ButtonDeactivated>
          ) : (
            <Button onClick={() => onClose()}>Não</Button>
          )}
        </Buttons>
      </Modal>
    </Container>
  );
};

export default Model;
