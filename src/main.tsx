import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import {QueryClient, QueryClientProvider} from 'react-query'
import App from "./App.tsx";
import theme from "./theme.ts";
import './index.css'

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
         <App />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
