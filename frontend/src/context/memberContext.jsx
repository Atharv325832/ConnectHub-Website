import { createContext, useContext, useState } from "react";
import api from "../services/api";

const MembersContext = createContext();

export const MembersProvider = ({ children }) => {

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMembersModal, setShowMembersModal] = useState(false);

    const fetchMembers = async (serverId) => {

        try {

            setLoading(true);

            const res = await api.get(`/servers/${serverId}/members`);

            setMembers(res.data);

            setShowMembersModal(true);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    const closeMembersModal = () => {

        setShowMembersModal(false);

    };

    return (

        <MembersContext.Provider
            value={{
                members,
                loading,
                showMembersModal,
                fetchMembers,
                closeMembersModal
            }}
        >

            {children}

        </MembersContext.Provider>

    );

};

export const useMembers = () => useContext(MembersContext);