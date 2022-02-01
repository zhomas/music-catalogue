import React from "react";
import type { FC } from "react";
import { Global, css } from "@emotion/react";

const globalStyles = css`
  body {
    background: #000;
    color: #fff;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul {
    list-style-type: none;
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  button {
    padding: 10px;
    cursor: pointer;
  }
`;

export const Layout: FC = ({ children }) => (
  <main>
    <Global styles={globalStyles} />
    {children}
  </main>
);
