import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const OpenUVContext = React.createContext();

export const OpenUVProvider = (props) => {
    const [uvLevel, setUVLevel] = useState([]);

    const getTheCurrentUVLevel = (lat, long, currentDateTime) => {
        return fetch(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${long}&dt=${currentDateTime}`, {
            method: "GET"
        })
            .then((res) => res.json())
            .then(setUVLevel);
    };


    return (
        < OpenUVContext.Provider value={{ uvLevel, setUVLevel, getTheCurrentUVLevel }}>
            {props.children}
        </OpenUVContext.Provider >
    );
};