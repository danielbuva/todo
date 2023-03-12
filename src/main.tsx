// import { ChakraProvider } from "@chakra-ui/react";
// import { theme } from "./lib/theme";
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <ChakraProvider theme={theme}> */}
    <App />
    {/* </ChakraProvider> */}
  </React.StrictMode>,
);
