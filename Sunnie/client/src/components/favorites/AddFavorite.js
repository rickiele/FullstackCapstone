import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FavoriteContext } from "../../providers/FavoriteProvider";

export const AddFavorite = ({ product }) => {
    const { addFavorite, getFavoritesByUserProfileId } = useContext(FavoriteContext);
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);
    const history = useHistory();

    const handleAddFavorite = () => {
        const favoriteObj = {
            userProfileId: userId,
            productId: product.id
        }
        addFavorite(favoriteObj)
            .then(getFavoritesByUserProfileId(userId))
        console.log("add favorite")
    }

    return (
        <>
            <Button onClick={handleAddFavorite} className="favorite-btn">Add Favorite</Button>
        </>
    )
};