import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/Theme";
import {ServerProvider} from "./context/ServerContext";
import { ChannelProvider} from "./context/ChannelContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthProvider>
      <ServerProvider> 
        <ChannelProvider>
          <App />
        </ChannelProvider>  
      </ServerProvider>
    </AuthProvider>
  </ThemeProvider>
);

