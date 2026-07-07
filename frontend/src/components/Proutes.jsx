import { Navigate } from "react-router-dom";
import { useAuth  } from "../context/AuthProvider";
import React from 'react'
import { useContext } from "react";

const Proutes = ({children}) => {
    const { user, loading } = useAuth();
    if(loading){
        return <h1>Loading...</h1>;
    }
    if(!user){
        return <Navigate to="/login" />;
    }
    return children;
}
export default Proutes;