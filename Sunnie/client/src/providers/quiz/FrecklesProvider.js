import React, { useState, useContext } from "react";
import { UserProfileContext } from "../UserProfileProvider";

export const FrecklesContext = React.createContext();

export const FrecklesProvider = (props) => {
    const [freckles, setFreckles] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const getAllFreckles = () => {
        return getToken().then((token) =>
            fetch("/api/freckles", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setFreckles));
    };

    return (
        < FrecklesContext.Provider value={{ freckles, setFreckles, getAllFreckles }}>
            {props.children}
        </FrecklesContext.Provider >
    );
};