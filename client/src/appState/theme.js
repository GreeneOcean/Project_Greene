import React from 'react';
import { createGlobalStyle, css } from 'styled-components';

const ThemeProvider = ({ STYLES, dimensions }) => {
  return (
    <GlobalStyles  />
  )
}

const media = {
  mobile: '425px',
  tablet: '768px',
  laptop: '1024px',
  /* laptopL: '1440px',
  desktop: '2560px' */
}

const GlobalStyles = createGlobalStyle`
* {
  margin: 0px;
  padding: 0px;
  border-width: 0px;
  box-sizing: border-box;
}

html,
body {
  max-width: 100%;
  overflow-x: hidden;
  min-height: 100%;
  height: 100%;
  background-color: rgb(247, 193, 18);
  font-family: 'Open Sans', sans-serif;
  color: white;
  --color1: #00933D;
  --color2: #00796F;
  --color3: #00586B;
  --color4: #2F4858;

}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  min-height: 100%;
  height: 50%;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}
`

export default ThemeProvider
