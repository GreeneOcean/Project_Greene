import React from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './app';
import AppContextProvider from './appState/index.js';

const Stack =
(
 <BrowserRouter>
  <AppContextProvider>
    <App />
  </AppContextProvider>
</BrowserRouter>
)

ReactDOM.createRoot(document.getElementById('root')).render(Stack)