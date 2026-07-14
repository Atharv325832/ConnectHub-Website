import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { useServers } from "./ServerContext";

const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const {
    servers,
    selectedServer,
    setSelectedServer,
    loading,
  } = useServers();

  const fetchChannels = async () => {
    try {
      if (!selectedServer) return;
      const { data } = await api.get(`/channels/${selectedServer._id}`);
      setChannels(data);
    } catch (err) {
      console.error(err);
    }
  };

  const createChannel = async (data) => {
    const res = await api.post("/channels", data);
    setChannels((prev) => [...prev, res.data]);
    return res.data;
  };
  useEffect(() => {
    if (selectedServer) {
      fetchChannels();
      setSelectedChannel(null);
    }
  }, [selectedServer]);

  const deleteChannel = async (id) => {
    console.log("Deleting:", id);
    const res = await api.delete(`/channel/${id}`);
    console.log(res.data);
    setChannels((prev) =>
      prev.filter((channel) => channel._id !== id)
    );
  };

  const rename = async (id, name) => {
    const res = await api.patch(`/channel/${id}`, {
      name,
    });

    setChannels((prev) =>
      prev.map((channel) =>
        channel._id === id ? res.data : channel
      )
    );
    return res.data;
  };


  return (
    <ChannelContext.Provider value={{ channels, setSelectedChannel, selectedChannel, setChannels, createChannel, fetchChannels, deleteChannel, rename }}>
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannels = () => useContext(ChannelContext);