import styled, { keyframes } from "styled-components";

const MoveUpDown = keyframes`
  0% {
    transform: translateY(0);
    }
  100% {
    transform: translateY(-10px);
    }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
`;

export const Background = styled.img`
  z-index: -1;
  position: absolute;
  width: 100%;
  top: 0;
  height: 100%;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 50vmin;
  padding: 2vmin;
`;

export const Title = styled.strong`
  font-size: 8vmin;
  padding: 1vmin;

  border-radius: 25px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const Mobile = styled.img`
  margin-top: 15vmin;
  height: 54vmin;
  width: 62vmin;

  animation: ${MoveUpDown} 1s alternate infinite;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 100%;
`;
