import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SkinTypeContext = React.createContext();

export const SkinTypeProvider = (props) => {
    const [skinType, setSkinType] = useState([]);
    const { getToken } = useContext(UserProfileContext);


    const getAllSkinTypes = () => {
        return getToken().then((token) =>
            fetch("/api/skintypes", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setSkinType));
    };

    const getSkinTypeById = (skinTypeId) => {
        return getToken().then((token) =>
            fetch(`/api/skintypes/getById/${skinTypeId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json()))
    }



    return (
        < SkinTypeContext.Provider value={{ skinType, setSkinType, getAllSkinTypes }}>
            {props.children}
        </SkinTypeContext.Provider >
    );
};