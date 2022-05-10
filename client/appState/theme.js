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




var calcRange = (baseValues, change, steps) => {
  baseValues = Array.isArray(baseValues) ? baseValues : [baseValues]
  var rangeKey = 0 - steps;
  const newRange = {};
  while(steps >= rangeKey) {
    // eslint-disable-next-line no-loop-func
    const newValues = baseValues.map((value, ind) => {
      var newValue = value + (rangeKey * change[ind])
      newValue = newValue > 0 ? newValue : 0;
      newValue = newValue > 255 ? 255 : newValue
      return newValue
    })
    newRange[rangeKey.toString()] = newValues.length > 1 ? newValues : newValues[0]
    rangeKey++
  }

  return newRange
}

var createTheme = (baseValues) => {
  const theme = {}
  const { background, font } = baseValues
  const baseBGColors = background.color;
  const baseBGChange = background.change || [5, 5, 5];
  const steps = background.range || 2;
  theme.bgc = calcRange(baseBGColors, baseBGChange, steps)

  const { fontSize, fontColor } = font;

  const fontColors = fontColor.value;
  const fontCChange = fontColor.change || [5, 5, 5];
  const fontCRange = fontColor.range || 2;
  theme.fc = calcRange(fontColors, fontCChange, fontCRange)

  const fontSizeBase = fontSize.value;
  const fontSChange = fontSize.change || [0.3];
  const fontSRange = fontSize.range || 2;
  theme.fs = calcRange(fontSizeBase, fontSChange, fontSRange)
  return theme
}


var darkBase = {
  background: {
    color: [30,30,30],
    change: [-5, -5, -5],
    range: 3,
  },
  font: {
    fontSize: {
      value: 1.1,
      range: 3,
      change: [.1]
    },
    fontColor: {
      value: [240, 240, 240]
    }
  }
}


var ligthBase = {
  background: {
    color: [240,240,240],
    range: 3,
  },
  font: {
    fontSize: {
      value: 1,
      range: 3,
      change: [.1]
    },
    fontColor: {
      value: [25, 25, 25]
    }
  }
}

export const darkTheme = createTheme(darkBase)
export const lightTheme = createTheme(ligthBase)


export default ThemeProvider
