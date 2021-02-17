import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  margin: 0% 0 3.5% 0;
`;

export const Titlebox = styled.div`
  margin: 20% 15% 20% 30%;
`;

export const Rectangle = styled.div`
  width: 40%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 9vmin;
  line-height: 9.5vmin;
  letter-spacing: 0.01em;
  align-self: flex-start;
  margin-bottom: 10%;
  font-weight: normal;
  font-style: normal;
`;

export const Subtitle = styled.h2`
  font-size: 2.5vmin;
  line-height: 3vmin;
  letter-spacing: 0.01em;
  align-self: center;
  font-weight: normal;
  font-style: normal;
`;
