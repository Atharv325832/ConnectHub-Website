import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Proutes from "./components/Proutes";

function App() {
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
      </Routes>
    </BrowserRouter>
    
  );
}
export default App;
