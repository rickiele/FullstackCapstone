import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const FavoriteContext = React.createContext();

export const FavoriteProvider = (props) => {
    const [favorite, setFavorite] = useState([]);
    const { getToken } = useContext(UserProfileContext);


    const GetFavoritesByUserProfileId = (userProfileId) => {
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
        < FavoriteContext.Provider value={{ favorite, GetFavoritesByUserProfileId }}>
            {props.children}
        </FavoriteContext.Provider >
    );
};