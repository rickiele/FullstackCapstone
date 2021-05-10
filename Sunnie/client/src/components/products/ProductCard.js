import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { ProductContext } from "../../providers/ProductProvider";
import { DeleteProduct } from "../products/DeleteProduct";

export const ProductCard = ({ product }) => {
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);

    // Modal stuff
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // LOGIC FOR SHOWING ONLY THE USER'S PRODUCTS
    // If the user matches the product's userId, then you will see the edit and delete buttons on the product card
    // Need to map over all of the products to show all the cards
    // Only display the user's own products for each profile
    // If the product's userProfileId matches the useParams of profile - show it


    return (
        <>

            <>
                <div key={product.id} onClick={handleShow}>
                    <h3>{product.name}</h3>
                </div>
            </>

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
                    <img src={product.imageLocation} />
                    <h2>SPF: {product.spf}</h2>
                    <h2>Type: {product.productType.type}</h2>
                    <p>{product.comment}</p>
                </Modal.Body>
                <Modal.Footer>
                    {product.userProfileId === userId ?
                        <>
                            {/* Make update and delete modals */}
                            <DeleteProduct key={product.id} product={product} />
                            <Button variant="primary">Update</Button>
                        </>
                        :
                        <>

                        </>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}