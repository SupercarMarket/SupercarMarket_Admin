import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// react-router-dom
import { BrowserRouter } from "react-router-dom";

// style theme
import theme from "./styles/theme";
import GlobalStyle from './styles/globalStyle';
import { ThemeProvider } from "styled-components"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // StrictMode를 켜두면 두번씩 실행되는 경우가 있어 주석처리했습니다.
  // <React.StrictMode>
  // <BrowserRouter>
    <ThemeProvider theme={ theme } >
      <GlobalStyle/>
      <App />
    </ThemeProvider>
  // </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
