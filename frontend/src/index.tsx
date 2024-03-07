import ReactDOM from 'react-dom/client'
import { createTheme, MantineProvider } from '@mantine/core';
import App from './App'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
// import classes from './index.module.css'

const theme = createTheme({
  colors: {
    primaryColors:
      [
        "#33767b",
        "#33767b",
        "#33767b",
        "#33767b",
        "#33767b",
        "#33767b",
        "#33767b",
        "#33767b",
        "#33767b",
        "#33767b",
      ],
  },
  primaryColor: "primaryColors",
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>
)