import styled from "styled-components";

import Button from "../Button";

interface ContainerProps {
  border: string;
}

export const Container = styled.div<ContainerProps>`
  height: 11vmin;
  width: 100%;
  left: 0px;
  top: 0;
  position: fixed;
  position: inline-block;
  z-index: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #130e2e;
  transition: all 0.5s ease;
  border-bottom: ${props => props.border};
  padding-bottom: 1px;
`;

export const Logo = styled.img`
  align-self: center;
  width: 20vmin;
  height: 10vmin;
  margin-left: 15vmin;
  cursor: pointer;
`;

export const Buttons = styled.div`
  display: flex;

  margin-right: 5vmin;
`;

export const CustomButton = styled(Button)`
  width: 15vmin;
  margin-right: 2vmin;
`;
