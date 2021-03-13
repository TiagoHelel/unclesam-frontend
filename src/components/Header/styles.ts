import styled from "styled-components";

import { shade } from "polished";

import Button from "../Button";

export const Container = styled.div``;

export const HeaderContainer = styled.header`
  padding: 32px 0;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  align-items: center;

  a {
    > img {
      height: 80px;
    }
  }

  button {
    margin-right: 20px;
    background: transparent;
    border: 0;
  }

  div {
    margin-left: auto;
  }

  svg {
    color: #999591;
    width: 20px;
    height: 20px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #f4ede8;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Plan = styled.strong`
  color: red;
  margin-right: 2vmin;
`;

export const CustomButtom = styled(Button)`
  width: 200px;
  font-size: 1.5vmin;
  font-weight: bold;
  background: #1771bd !important;

  &:hover {
    background: ${shade(0.2, "#1771bd")} !important;
  }
`;
