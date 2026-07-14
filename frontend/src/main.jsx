import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/Theme";
import { ServerProvider } from "./context/ServerContext";
import { ChannelProvider } from "./context/ChannelContext";
import { MembersProvider } from "./context/memberContext";
import { MessageProvider } from "./context/MessageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthProvider>
      <ServerProvider>
        <ChannelProvider>
          <MembersProvider>
            <MessageProvider>
              <App />
            </MessageProvider>
          </MembersProvider>
        </ChannelProvider>
      </ServerProvider>
    </AuthProvider>
  </ThemeProvider>
);

