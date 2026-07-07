import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthProvider";

const ServerContext = createContext();

export const ServerProvider = ({ children }) => {
    const { user } = useAuth();
    const [servers, setServers] = useState([]);
    const [selectedServer, setSelectedServer] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchServers = async () => {
        try {
            setLoading(true);
            const res = await api.get("/get-server");
            setServers(res.data);

            if (res.data.length > 0 && !selectedServer) {
                setSelectedServer(res.data[0]);
            }
        } catch (err) {
            console.error("Error fetching servers:", err);
        } finally {
            setLoading(false);
        }
    };

    const createServer = async (formData) => {
        try {
            const res = await api.post("/create-server", formData);
            setServers((prev) => [res.data, ...prev]);

            setSelectedServer(res.data);
            return res.data;

        } catch (err) {
            console.error("Error creating server:", err);
            throw err;
        }
    };

   useEffect(() => {
    if (user) {
        fetchServers();
    } else {
        setServers([]);
        setSelectedServer(null);
    }
}, [user]);

    return (
        <ServerContext.Provider
            value={{
                servers,
                loading,
                selectedServer,
                setSelectedServer,
                fetchServers,
                createServer
            }}
        >
            {children}
        </ServerContext.Provider>
    );
};

export const useServers = () => {
    return useContext(ServerContext);
};