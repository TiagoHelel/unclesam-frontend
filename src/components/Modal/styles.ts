import styled from 'styled-components';

import Button from '../Button';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: 100px;
  /* padding: 50; */
`;

export const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 30px;
  font-size: 30px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonDeactivated = styled(Button)`
  background-color: rgba(0, 0, 0, 0.1);
  cursor: auto;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const Space = styled.div`
  margin: 0 60px 0 60px;
`;
