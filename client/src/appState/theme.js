import React from 'react';
import { createGlobalStyle, css, keyframes } from 'styled-components';

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

const GradientBG = keyframes`
  0%{
    background-size: 100% 100%;
  }
  50%{
    background-size: 300% 300%;
  }
  100%{
    background-size: 100% 100%;
  }
`;

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
  font-family: 'Open Sans', sans-serif;
  --color1: #00C753;
  --color2: #009185;
  --color3: #00819E;
  --color4: #4A738C;

  background: linear-gradient(-45deg, var(--color1), var(--color2), var(--color3), var(--color4));
  background-size: 100% 100%;


  animation: ${GradientBG};
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;

}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  min-height: 100%;
  height: 100%;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}
`

export default ThemeProvider