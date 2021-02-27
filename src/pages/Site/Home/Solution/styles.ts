import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Background = styled.img`
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 75%;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

export const Title = styled.strong`
  font-size: 8vmin;
  margin-bottom: 20vmin;
  margin-top: 20vmin;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DetailsText = styled.p`
  width: 27vmin;
  margin: 2.5vmin 10vmin;
  padding: 2.5vmin 1vmin 1vmin 1vmin;
  font-size: 2.4vmin;
  text-align: center;

  border-top: 0.3vmin solid #6182c7;
  border-radius: 2.5vmin;
`;
