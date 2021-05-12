import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Button, Modal, Card, Row, Col } from "react-bootstrap";
import { ProductContext } from "../../providers/ProductProvider";
import { DeleteProduct } from "../products/DeleteProduct";
import { UpdateProduct } from "../products/UpdateProduct";
import { AddFavorite } from "../favorites/AddFavorite";
import { FavoriteContext } from "../../providers/FavoriteProvider";

export const ProductCard = ({ product }) => {
    const { addFavorite, getFavoritesByUserProfileId } = useContext(FavoriteContext);
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);

    // Modal stuff
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Add favorite function for the button's onClick
    const handleAddFavorite = () => {
        const favoriteObj = {
            userProfileId: userId,
            productId: product.id
        }
        addFavorite(favoriteObj)
            .then(getFavoritesByUserProfileId(userId))
            .then(handleClose())
        console.log("add favorite")
    }

    // JSX for the 'Product Card'
    return (
        <>

            <>
                {/*IF the Product's userProfileId matches the logged in userProfile's Id,
                   show the Product Card with the Edit and Delete button
                   IF NOT - show just the card*/}
                {product.userProfileId === userId ?
                    <>
                        <Card key={product.id}>
                            <Row>
                                <Col>
                                    <h3>{product.name}</h3>
                                </Col>
                                <Col>
                                    <Button onClick={handleShow}>Edit</Button>
                                </Col>
                                <Col>
                                    <DeleteProduct key={product.id} product={product} />
                                </Col>
                            </Row>
                        </Card>
                    </>
                    :
                    <><Card key={product.id} onClick={handleShow}><h3>{product.name}</h3></Card></>
                }
            </>

            {/* Modal for Product Card */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title><h1>{product.name}</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*If the Product's userProfileId matches the logged in userProfile's Id,
                        show the favorite button*/}
                    {product.userProfileId === userId ?
                        <><Button className="favorite-btn" onClick={handleAddFavorite}>Add Favorite</Button></>
                        :
                        <></>
                    }
                    <img src={product.imageLocation} className="product-img" />
                    <h2>SPF: {product.spf}</h2>
                    <h2>Type: {product.productType.type}</h2>
                    <p>{product.comment}</p>
                </Modal.Body>
                <Modal.Footer>
                    {product.userProfileId === userId ?
                        <>
                            {/* If the Product's userProfileId matches the logged in userProfile's Id
                                Show the UpdateProduct button */}
                            <UpdateProduct key={product.id} product={product} />
                        </>
                        :
                        <></>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}