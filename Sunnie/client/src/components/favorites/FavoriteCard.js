import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Button, Modal, Card, Row, Col, Container } from "react-bootstrap";
import { ProductContext } from "../../providers/ProductProvider";
import { FavoriteContext } from "../../providers/FavoriteProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const FavoriteCard = ({ favorite }) => {
    // UseContext
    const { products, getAllProducts, getProductsByUser } = useContext(ProductContext);
    const { deleteFavorite, favorites, getFavoritesByUserProfileId } = useContext(FavoriteContext);

    // Get the current logged in user
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

    // Get the userProfileId from the URL
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);

    const [product, setProduct] = useState({});

    // Modal - Setting states
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Function for the 'Delete Favorite' button
    const handleDeleteFavorite = () => {
        deleteFavorite(favorite.id)
            .then(getFavoritesByUserProfileId(userId))
        handleClose();
    };


    // JSX for the 'Favorite Card'
    return (
        <>
            <Card onClick={handleShow}>
                <img src={favorite.product.imageLocation} />
                <h3>{favorite.product.name} <FontAwesomeIcon icon="heart" /></h3>
            </Card>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title><h1>{favorite.product.name}</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img className="product-img" src={favorite.product.imageLocation} />
                    <h2>SPF: {favorite.product.spf}</h2>
                    <h2>{favorite.product.productType.type}</h2>
                    <p>{favorite.product.comment}</p>
                </Modal.Body>
                <Modal.Footer>
                    {currentUser.id === userId ?
                        <><Button onClick={handleDeleteFavorite}>Delete Favorite</Button></> :
                        <> </>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}