import styled from "styled-components";

export const Container = styled.div`
  height: 20vmin;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #130e2e;
  border-top: 1px solid #0b1c58;
  padding-top: 1px;
`;

export const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  align-self: center;
  width: 10vmin;
  height: 10vmin;
  margin: 0 2vmin 0 15vmin;
  cursor: pointer;
`;

export const Name = styled.strong`
  font-size: 4vmin;
`;

export const Slogan = styled.strong`
  margin-left: 2vmin;
  font-size: 2vmin;
`;

export const Email = styled.strong`
  margin-right: 5vmin;
  font-size: 3vmin;
  cursor: pointer;
`;
