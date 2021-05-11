import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Button, Modal, Card, Row, Col } from "react-bootstrap";
import { ProductContext } from "../../providers/ProductProvider";
import { FavoriteContext } from "../../providers/FavoriteProvider";

export const FavoriteCard = () => {
    const { products, getAllProducts, getProductsByUser } = useContext(ProductContext);
    const { favorite, getFavoritesByUserProfileId } = useContext(FavoriteContext);
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);

    // Modal stuff
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(favorite, products, "favorite")
    return (
        <>

            <Card onClick={handleShow}>
                <h3></h3>
            </Card>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title><h1>PRODUCT NAME</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img className="product-img" />
                    <h2>SPF:</h2>
                    <h2>Type:</h2>
                    <p></p>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}