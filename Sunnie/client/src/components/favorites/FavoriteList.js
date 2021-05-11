import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FavoriteCard } from "./FavoriteCard";
import { Container, Button, Dropdown, Card } from "react-bootstrap"
import { FavoriteContext } from "../../providers/FavoriteProvider";
import { ProductContext } from "../../providers/ProductProvider";


export const FavoriteList = () => {
    const { products, getProductsByUser, getAllProducts } = useContext(ProductContext);
    const { favorites, getFavoritesByUserProfileId } = useContext(FavoriteContext);
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);

    const [favorite, setFavorite] = useState({});

    useEffect(() => {
        getFavoritesByUserProfileId(userId)
            .then((res) => {
                setFavorite(res)
            })
    }, []);

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