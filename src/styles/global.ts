import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: linear-gradient(90deg, #130e2e, #26316e);
    color: #e3e5e8;
    -webkit-font-smoothing: antialiased;
    font-family: 'Robot Slab', serif;
    font-size: 1.6vmin;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }

  input[type=number] {
      -moz-appearance:textfield; /* Firefox */
  }

  input:required {
    box-shadow:none;
  }
  input:invalid {
      box-shadow:none;
  }
`;
