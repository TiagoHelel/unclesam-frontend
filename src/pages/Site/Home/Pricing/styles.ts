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
  padding: 50px 20px;
  border-radius: 24px;
  margin-top: 50px;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const Head = styled.div`
  border: 2px solid #fff;
  border-radius: 25px;
  padding: 10px;
  width: 115px;
  text-align: center;
`;

export const Body = styled.div`
  text-align: center;
  padding: 25px;
  margin-top: -15px;
  z-index: -1;
  width: 250px;
  font-size: 30px;
`;

export const Extension = styled.div`
  width: 250px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.7);
  color: #111;
  border-radius: 50px;
  padding: 2px;
`;
