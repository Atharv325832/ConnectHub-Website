import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import socket from "./socket";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Proutes from "./components/Proutes";
import InvitePage from "./pages/InvitePage";

function App() {
  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log("❌ Connect Error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.log("🔌 Disconnected:", reason);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (

    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/"
          element={<Register />}
        />
        <Route
          path="/dashboard"
          element={
            <Proutes>
              <Dashboard />
            </Proutes>
          }
        />
        <Route
          path="/invite/link/:code"
          element={<InvitePage />}
        />
      </Routes>
    </BrowserRouter>

  );
}
export default App;
