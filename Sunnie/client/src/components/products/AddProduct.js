import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Card, Button, Modal, Row, Col, Form } from "react-bootstrap";
import { ProductContext } from "../../providers/ProductProvider";
import { ProductTypeContext } from "../../providers/ProductTypesProvider";

export const AddProduct = () => {
    const { addProduct, getProductsByUser } = useContext(ProductContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);

    const [product, setProduct] = useState({
        name: "",
        userProfileId: currentUser.id,
        // imageLocation: "",
        createDateTime: "",
        productTypeId: 0,
        spf: "",
        comment: ""
    });

    useEffect(() => {
        getProductsByUser()
    }, []);

    const handleInput = (e) => {
        const newProduct = { ...product };

        newProduct[e.target.id] = e.target.value
        setProduct(newProduct);
    };

    const handleRefresh = () => {
        window.location.reload()
    }

    const handleSave = () => {
        addProduct({
            name: product.name,
            userProfileId: currentUser.id,
            // imageLocation: product.imageLocation,
            createDateTime: new Date(),
            productTypeId: product.productTypeId,
            spf: product.spf,
            comment: product.comment
        })
        // Add this in after you fix the window-reload property
        // handleRefresh()
        handleClose()
    };

    // Modal stuff
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {currentUser.id === userId ?
                <><Button className="finish__btn" variant="primary" size="sm"
                    onClick={handleShow}>Add Product</Button></>
                :
                <><Button style={{ display: 'none' }}
                    onClick={handleShow}>Oink</Button></>
            }

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add a product</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" required className="form-control" onChange={handleInput} />
                    </Form.Group>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="productTypeId">Type</label>
                            <select name="productTypeId" id="productTypeId" className="form-control" onChange={handleInput} >
                                <option value="0">What type of product is it?</option>
                                <option value="1">Hat</option>
                                <option value="2">Sunglasses</option>
                                <option value="3">Clothing</option>
                                <option value="4">Lip Balm</option>
                                <option value="5">Makeup</option>
                                <option value="6">Sunscreen Lotion</option>
                                <option value="7">Sunscreen Cream</option>
                                <option value="8">Sunscreen Gel</option>
                                <option value="9">Sunscreen Oil</option>
                                <option value="10">Sunscreen Spray</option>
                                <option value="11">Sunscreen Powder</option>
                                <option value="12">Other</option>
                            </select>
                        </div>
                    </fieldset>


                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="spf">SPF</label>
                            <input type="text" id="spf" required className="form-control" onChange={handleInput} />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="comment">Comments</label>
                            <input as="textarea" id="comment" required className="form-control" onChange={handleInput} />
                        </div>
                    </fieldset>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSave}>Add Product</Button>
                </Modal.Footer>
            </Modal>
        </>

    )






}