import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import AppContextProvider from "./appState/index.js";

const Stack = (
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);

<<<<<<< HEAD
ReactDOM.render(Stack, document.getElementById("root"));
=======
ReactDOM.render(Stack, document.getElementById('root'));
>>>>>>> f088cd8a04d737997a52c4e0a03d568a64d24852
