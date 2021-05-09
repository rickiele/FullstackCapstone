import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Card, Button, Modal, Row, Col, Form } from "react-bootstrap";
import { ProductContext } from "../../providers/ProductProvider";
import { ProductTypeContext } from "../../providers/ProductTypesProvider";


export const ProductCard = ({ product }) => {
    const { products, addProduct, getProductsByUser } = useContext(ProductContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);

    // Modal stuff
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const productName = products.map(product => product.name);
    console.log(products, "products")


    // If the user matches the product's userId, then you will see the edit and delete buttons on the product card
    // Need to map over all of the products to show all the cards
    return (
        <>

            {/* {products.map((product) => (
                <div key={product.id} onClick={handleShow}>
                    <h3>{product.name}</h3>
                </div>
            ))} */}
            <div key={product.id} onClick={handleShow}>
                <h3>{product.name}</h3>
            </div>

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
                            <Button variant="primary">Update</Button>
                            <Button variant="primary">Delete</Button>
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