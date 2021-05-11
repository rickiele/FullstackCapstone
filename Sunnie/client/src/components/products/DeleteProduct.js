import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { ProductContext } from "../../providers/ProductProvider";


export const DeleteProduct = ({ product }) => {
    const { deleteProduct, getProductsByUser } = useContext(ProductContext);
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);

    // Modal stuff
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // useEffect(() => {
    //     getProductsByUser(product.id)
    // });

    // if statement 

    const handleYesDelete = () => {
        deleteProduct(product.id)
            .then(getProductsByUser(userId))
        handleClose()
    }
    // can delete but it returns a products.map is not a function

    return (
        <>

            <>
                <Button key={product.id} onClick={handleShow}>
                    Delete
                </Button>
            </>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <p>Are you sure you want to delete the product</p>
                        <h1>{product.name}?</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={handleYesDelete}> Yes </Button>
                    <Button onClick={handleClose}> No </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}