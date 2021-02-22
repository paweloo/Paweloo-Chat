import React from "react";
import { createGlobalStyle } from "styled-components";

const Style = createGlobalStyle`

body {
  background-color: ${({ theme }) => theme.body};
  transition: background 0.1s ease-out;
}

header, form {
    background-color: ${({ theme }) => theme.body};
    box-shadow: ${({ theme }) => theme.header};
    transition: background 0.1s ease-out;
}
`;

function GlobalStyles() {
  return <Style></Style>;
}

export default GlobalStyles;
