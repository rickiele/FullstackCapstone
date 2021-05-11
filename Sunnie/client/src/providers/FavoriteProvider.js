import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const FavoriteContext = React.createContext();

export const FavoriteProvider = (props) => {
    const [favorites, setFavorites] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const getFavoritesByUserProfileId = (userProfileId) => {
        return getToken().then((token) =>
            fetch(`/api/Favorite/getbyUserId/${userProfileId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json()))
            .then(setFavorites)
    }

    const getFavoriteById = (favoriteId) => {
        return getToken().then((token) =>
            fetch(`/api​/Favorite​/getFavoriteById​/${favoriteId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json()))

    };

    const addFavorite = (favorite) => {
        return getToken().then((token) =>
            fetch("/api/Favorite/Add", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(favorite)
            })
        )
    };

    const deleteFavorite = (favoriteId) => {
        return getToken().then((token) =>
            fetch(`/api/Favorite/Delete/${favoriteId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }))
    };


    return (
        <FavoriteContext.Provider value={{ favorites, getFavoritesByUserProfileId, getFavoriteById, addFavorite, deleteFavorite }}>
            {props.children}
        </FavoriteContext.Provider >
    );
};