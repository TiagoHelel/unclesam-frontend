import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 80vh;
`;

export const Title = styled.strong`
  font-size: 5vmin;
`;

export const Content = styled.div`
  margin-top: 5vmin;
`;

export const Email = styled.div`
  font-size: 2.5vmin;
  cursor: pointer;
`;

export const HappyMessage = styled.div`
  font-size: 2.5vmin;
  margin-top: 2vmin;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
`;
