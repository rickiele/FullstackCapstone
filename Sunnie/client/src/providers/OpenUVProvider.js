import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const OpenUVContext = React.createContext();

export const OpenUVProvider = (props) => {
    const [uvLevel, setUVLevel] = useState([]);
    const { getToken } = useContext(UserProfileContext);


    const getTheCurrentUVLevel = () => {
        return getToken().then((token) =>
            fetch("https://api.openuv.io/api/v1/uv", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setUVLevel));
    };


    return (
        < OpenUVContext.Provider value={{ uvLevel, setUVLevel, getTheCurerntUVLevel }}>
            {props.children}
        </OpenUVContext.Provider >
    );
};