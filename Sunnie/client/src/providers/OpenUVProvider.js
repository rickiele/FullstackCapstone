import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const OpenUVContext = React.createContext();

export const OpenUVProvider = (props) => {
    const [uvLevel, setUVLevel] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const currentDateTime = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
    console.log(currentDateTime, "provider - current date time");

    const getTheCurrentUVLevel = (latitude, longitude, currentDateTime) => {
        return fetch(`https://api.openuv.io/api/v1/uv?lat=${36.14}&lng=${86.63}&dt=${currentDateTime}`, {
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