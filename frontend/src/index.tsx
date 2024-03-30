import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client'
import { SessionProvider } from './context/SessionContext';
import { createTheme, MantineProvider } from '@mantine/core';
import App from './App'
import './index.css'

const theme = createTheme({
  colors: {
    primaryColors:
      [
        "#8664FE",
        "#8664FE",
        "#8664FE",
        "#8664FE",
        "#8664FE",
        "#8664FE",
        "#8664FE",
        "#8664FE",
        "#8664FE",
        "#8664FE",
      ],
  },
  primaryColor: "primaryColors",
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <SessionProvider>
        <App />
      </SessionProvider>
    </MantineProvider>
  </React.StrictMode>
)