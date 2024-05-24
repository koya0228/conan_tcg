import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  colors: {
    main: "#408a62",
    accent: "#cd9323",
    black1: "#1a201d",
    black2: "#3c423e",
    gray: "#686b69",
    white2: "#adb1af",
    white1: "#f7faf8",
  },
  styles: {
    global: (props) => ({
      "body": {
        bg: mode("white1", "black2")(props),
        color: mode("black2", "white1")(props),
      },
      "button": {
        fontWeight: "bold",
        color: mode("black2", "white1")(props),
      },
      ".header": {
        bg: mode("main", "black1")(props),
      },
    })
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
