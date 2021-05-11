import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Button, Modal, Card, Row, Col } from "react-bootstrap";
import { ProductContext } from "../../providers/ProductProvider";
import { DeleteProduct } from "../products/DeleteProduct";
import { UpdateProduct } from "../products/UpdateProduct";
import { AddFavorite } from "../favorites/AddFavorite";

export const ProductCard = ({ product }) => {
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);

    // Modal stuff
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <>
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
                            </Row>
                        </Card>
                    </>
                    :
                    <><Card key={product.id} onClick={handleShow}><h3>{product.name}</h3></Card></>
                }
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
                    {/* Click and done - do not ask for confirmation */}
                    {product.userProfileId === userId ?
                        <><AddFavorite key={product.id} product={product} /></>
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
                            {/* Make update and delete modals */}
                            <DeleteProduct key={product.id} product={product} />
                            {/* <div>{updateProduct()}</div> */}
                            <UpdateProduct key={product.id} product={product} />
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