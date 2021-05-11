import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "react-bootstrap";
import { FavoriteContext } from "../../providers/FavoriteProvider";

export const DeleteFavorite = ({ favorite }) => {
    const { deleteFavorite, getFavoritesByUserProfileId } = useContext(FavoriteContext);
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);

    // do you need to get all the favorites to rerender?
    const handleDeleteFavorite = () => {
        deleteFavorite(favorite.id)
            .then(getFavoritesByUserProfileId(userId))
    };

    return (
        <Button onClick={handleDeleteFavorite}>Delete Favorite</Button>

    );
};
