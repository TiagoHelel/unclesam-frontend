import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 80vh;
`;

export const Background = styled.img`
  width: 100%;
  max-height: 500px;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 100%;
`;

export const Details = styled.div`
  width: 250px;
  margin: 25px 100px;
  padding-top: 25px;
  font-size: 18px;

  border-top: 3px solid rgba(25, 32, 47, 1);
`;
