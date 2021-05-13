import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { ProductContext } from "../../providers/ProductProvider";


export const DeleteProduct = ({ product }) => {
    const { deleteProduct, getProductsByUser } = useContext(ProductContext);

    // Get the userProfileId from the URL
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);

    // Modal - Setting states
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Function to delete the product
    const handleYesDelete = () => {
        deleteProduct(product.id)
            .then(getProductsByUser(userId))
        handleClose()
    }

    // JSX for the 'Delete Product' modal
    return (
        <>
            <>
                <Button id="button" key={product.id} onClick={handleShow}>
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