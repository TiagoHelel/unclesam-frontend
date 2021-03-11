import styled from "styled-components";

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
  height: 75%;
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
  /* margin-left: 20vmin; */
  /* margin-top: 20vmin; */
  width: 50vmin;
  margin-left: -10vmin;
  margin-right: 10vmin;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Circle = styled.li`
  width: 13vmin;
  height: 13vmin;
  text-align: center;
  line-height: 21vmin;
  border-radius: 8vmin;
  background: #141a40;
  margin: 0 6vmin;
  display: inline-block;
  color: white;
  position: relative;
  margin-top: 5vmin;

  &:before {
    content: "";
    position: absolute;
    top: 6.5vmin;
    left: -14vmin;
    width: 14vmin;
    height: 1vmin;
    background: #141a40;
    z-index: -1;
  }

  &:first-child::before {
    display: none;
  }
`;

export const CircleLabel = styled.li`
  width: 13vmin;
  text-align: center;
  margin: 0 6vmin;
  display: inline-block;
  position: relative;
  margin-top: 5vmin;
  font-weight: 700;
  font-size: 2.3vmin;
  color: #6182c7;
`;
