import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FavoriteContext } from "../../providers/FavoriteProvider";

export const AddFavorite = ({ product }) => {
    const { addFavorite, getFavoritesByUserProfileId } = useContext(FavoriteContext);
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);
    const history = useHistory();

    // Modal - setting states
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Function for the 'Add Favorite' button
    const handleAddFavorite = () => {
        const favoriteObj = {
            userProfileId: userId,
            productId: product.id
        }
        addFavorite(favoriteObj)
            .then(() => getFavoritesByUserProfileId(userId))
            .then(() => handleClose())
        console.log("add favorite")
    }

    // JSX for the 'Add Favorite' button
    return (
        <>
            <Button id="button" onClick={handleAddFavorite} className="favorite-btn">Add Favorite</Button>
        </>
    )
};