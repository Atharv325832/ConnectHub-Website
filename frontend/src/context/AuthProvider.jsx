import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const login=(userData)=>{
    setUser(userData);
};

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  }
   
const fetchUser = async () => {
    try {
        const res = await api.get("/auth/me");
        setUser(res.data);
    } catch (err) {
        setUser(null);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchUser();
}, []);

  

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading, login, logout,fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
    return useContext(AuthContext);
};