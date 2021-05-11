import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const FavoriteContext = React.createContext();

export const FavoriteProvider = (props) => {
    const [favorites, setFavorite] = useState([]);
    const { getToken } = useContext(UserProfileContext);


    const getFavoritesByUserProfileId = (userProfileId) => {
        return getToken().then((token) =>
            fetch(`/api/favorite/getById/${userProfileId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json()))
    }

    return (
        < FavoriteContext.Provider value={{ favorites, getFavoritesByUserProfileId }}>
            {props.children}
        </FavoriteContext.Provider >
    );
};