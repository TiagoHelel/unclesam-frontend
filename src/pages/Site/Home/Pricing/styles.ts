import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 20vmin;
`;

export const Title = styled.strong`
  font-size: 5vmin;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  width: 100%;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid #fff;
  padding: 5vmin 2vmin;
  border-radius: 2.4vmin;
  margin-top: 5vmin;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const Head = styled.div`
  border: 2px solid #fff;
  border-radius: 2.5vmin;
  padding: 1vmin;
  width: 11.5vmin;
  text-align: center;
`;

export const Body = styled.div`
  text-align: center;
  padding: 2.5vmin;
  margin-top: -1.5vmin;
  z-index: -1;
  width: 25vmin;
  font-size: 3vmin;
`;

export const Extension = styled.div`
  width: 27vmin;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.7);
  color: #111;
  border-radius: 5vmin;
  padding: 0.2vmin;
`;
