import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 80vh;
`;

export const Background = styled.img`
  z-index: -300;
  position: absolute;
  width: 100%;
  height: 500px;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.strong`
  font-size: 5vmin;
  margin-top: 200px;
  width: 300px;
`;

export const Subtitle = styled.strong`
  font-size: 5vmin;
  margin-top: 150px;
`;

export const Mobile = styled.img`
  margin-top: 150px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 100%;
`;