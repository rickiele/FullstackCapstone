import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Button, Modal, Card, Row, Col, Container } from "react-bootstrap";
import { ProductContext } from "../../providers/ProductProvider";
import { FavoriteContext } from "../../providers/FavoriteProvider";
import { DeleteFavorite } from "../favorites/DeleteFavorite";

export const FavoriteCard = ({ favorite }) => {
    const { products, getAllProducts, getProductsByUser } = useContext(ProductContext);
    const { deleteFavorite, favorites, getFavoritesByUserProfileId } = useContext(FavoriteContext);
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);

    const [product, setProduct] = useState({});
    useEffect(() => {
        getProductsByUser(userId)
            .then((res) => {
                setProduct(res)
            })
        getFavoritesByUserProfileId(userId);
    }, []);

    // Modal stuff
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteFavorite = () => {
        deleteFavorite(favorite.id)
        handleClose();
    };


    console.log(favorite, "favoriteCard")
    return (
        <>
            <Card onClick={handleShow}>
                <img className="favoriteProductImage" src={favorite.product.imageLocation} />
                <h3>{favorite.product.name}</h3>
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
                    <img className="favoriteProductImage" src={favorite.product.imageLocation} />
                    <h2>SPF: {favorite.product.spf}</h2>
                    <h2>Type: {favorite.product.productType.type}</h2>
                    <p></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleDeleteFavorite}>Delete F</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}