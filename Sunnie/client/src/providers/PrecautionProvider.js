import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PrecautionContext = React.createContext();

export const PrecautionProvider = (props) => {
    const [precaution, setPrecaution] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const getAllPrecautions = () => {
        return getToken().then((token) =>
            fetch("/api/precaution", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(res => res.json()))
    }




    return (
        <PrecautionContext.Provider value={{ precaution, setPrecaution, getAllPrecautions }}>
            {props.children}
        </PrecautionContext.Provider >
    );
};