import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FavoriteCard } from "./FavoriteCard";
import { FavoriteContext } from "../../providers/FavoriteProvider";
import { ProductContext } from "../../providers/ProductProvider";


export const FavoriteList = () => {
    const { favorites, getFavoritesByUserProfileId } = useContext(FavoriteContext);
    const { products } = useContext(ProductContext);
    // Gets the userProfileId from the URL
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);

    // Use state for the favorites
    const [favorite, setFavorite] = useState({});

    // Get all of the 'Favorites' by the userProfileId
    useEffect(() => {
        getFavoritesByUserProfileId(userId)
            .then((res) => {
                setFavorite(res)
            })
    }, []);

    useEffect(() => {
        getFavoritesByUserProfileId(userId)
            .then((res) => {
                setFavorite(res)
            })
    }, [favorite, products]);


    // JSX for the 'Favorite' list
    return (
        <>
            {
                favorites.map((favorite) => (
                    <FavoriteCard key={favorite.id} favorite={favorite} />
                ))
            }
        </>
    );
};