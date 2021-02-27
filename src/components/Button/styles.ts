import styled from "styled-components";

import { shade } from "polished";

export const Container = styled.button`
  background: #0b1c58;
  font-size: 1.8vmin;
  height: 5.6vmin;
  border-radius: 1vmin;
  border: 0;
  padding: 0 1.6vmin;
  color: #f4ede8;
  width: 100%;
  font-weight: 500;
  margin-top: 1.6vmin;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, "#0b1c58")};
  }
`;
