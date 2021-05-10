import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { ProductContext } from "../../providers/ProductProvider";


export const UpdateProduct = ({ product }) => {
    const { updateProduct, getProductsByUser } = useContext(ProductContext);

    // User ids
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);

    // Modal stuff
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [aProduct, setProduct] = useState();

    // Save the user input
    const handleInput = (e) => {
        const newProduct = { ...aProduct }
        newProduct[e.target.id] = e.target.value
        setProduct(newProduct);
        console.log("handle input")
    }

    // Save the user's updated product
    const handleYesUpdate = () => {
        updateProduct({
            id: product.id,
            name: product.name,
            userProfileId: currentUser.id,
            // imageLocation: product.imageLocation,
            createDateTime: new Date(),
            productTypeId: product.productTypeId,
            spf: product.spf,
            comment: product.comment
        })
        handleClose()
        console.log("update")
    };


    // JSX for the product update form
    return (
        <>

            <>
                <Button key={product.id} onClick={handleShow}>
                    Update
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
                        <p>Update</p>
                        <h1>{product.name}?</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" required className="form-control" defaultValue={product.name} onChange={handleInput} />
                        </div>
                    </fieldset>

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
                            <input type="text" id="spf" required className="form-control" defaultValue={product.spf} onChange={handleInput} />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="comment">Comments</label>
                            <input as="textarea" id="comment" required className="form-control" onChange={handleInput} defaultValue={product.comment} onChange={handleInput} />
                        </div>
                    </fieldset>


                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}> Go Back </Button>
                    <Button onClick={handleYesUpdate}> Save Changes </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}