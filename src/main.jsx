import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import App from "./App.jsx";
import { extendTheme } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "gray.100",
      },
    }),
  },
  config
})

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <App/>
    </ChakraProvider>
  </BrowserRouter>
  // </React.StrictMode>,
)