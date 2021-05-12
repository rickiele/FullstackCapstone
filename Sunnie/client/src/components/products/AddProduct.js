import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import { ProductContext } from "../../providers/ProductProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";

export const AddProduct = () => {
    const { addProduct, getProductsByUser } = useContext(ProductContext);
    const { getUserProfileById } = useContext(UserProfileContext);

    // Gets a userProfile object of the current user
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

    // Gets the userProfileId from the URL
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);

    // Set the product's state
    const [product, setProduct] = useState({
        name: "",
        userProfileId: currentUser.id,
        imageLocation: "",
        createDateTime: "",
        productTypeId: 0,
        spf: "",
        comment: ""
    });

    // Handle the product form input
    const handleInput = (e) => {
        const newProduct = { ...product };

        newProduct[e.target.id] = e.target.value
        setProduct(newProduct);
    };

    // Cloudinary use states
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    // Cloudinary upload
    const uploadImage = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'sunnie');
        setLoading(true);

        // Fetch the upload
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/sunnie-image/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json();

        // Set the upload to false once the response comes back
        setImage(file.secure_url)
        setLoading(false);
    }

    // Function to save the product
    const handleSave = () => {
        addProduct({
            name: product.name,
            userProfileId: currentUser.id,
            imageLocation: image,
            createDateTime: new Date(),
            productTypeId: product.productTypeId,
            spf: product.spf,
            comment: product.comment
        })
            .then(() => getProductsByUser(userId))
        handleClose()
    };

    // UseState for the userProfile
    const [userProfile, setUserProfile] = useState({ userProfile: {} });

    // Get the userProfile by the Id
    // Then gets the products by the user
    useEffect(() => {
        getUserProfileById(userId)
            .then((response) => {
                setUserProfile(response)
            }).then(() => getProductsByUser(userId))
    }, []);

    // Modal - setting states
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // JSX for Add Product modal
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
                        <Form.Label htmlFor="imageLocation">Upload a profile image</Form.Label>
                        <Form.Control type="file" name="file" placeholder="Upload an image" onChange={uploadImage} />
                        {loading ? (
                            <h3>Loading...</h3>
                        ) : (
                            <img src={image} style={{ width: '300px' }} />
                        )}
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