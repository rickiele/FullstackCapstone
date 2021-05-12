import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { ProductContext } from "../../providers/ProductProvider";


export const UpdateProduct = ({ product }) => {
    const { updateProduct, getProductsByUser } = useContext(ProductContext);

    // User Ids
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);

    // Cloudinary use states
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

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

    // Modal States
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [aProduct, setProduct] = useState({
        id: product.id,
        name: product.name,
        userProfileId: currentUser.id,
        imageLocation: image,
        createDateTime: new Date(),
        productTypeId: product.productTypeId,
        spf: product.spf,
        comment: product.comment
    })

    // Save the user input
    const handleInput = (e) => {
        const newProduct = { ...aProduct }

        newProduct[e.target.id] = e.target.value
        setProduct(newProduct);
        console.log("handle input")
    }

    // Save the user's updated product
    // One line return statement - Anonymous function
    // No curly brackets - If curly brackets - you can do more than one thing
    const handleYesUpdate = () => {
        updateProduct(aProduct)
            .then(() => getProductsByUser(userId))
        handleClose()
        console.log(aProduct, "update")
    };

    console.log(image)


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

                    <Form.Label htmlFor="imageLocation"><h3>Current Image</h3></Form.Label>
                    <img src={product.imageLocation} style={{ width: '300px' }} />
                    {loading ? (
                        <h3>Loading...</h3>
                    ) : (
                        <>
                            <h3>New Product Image</h3>
                            <img src={image} style={{ width: '300px' }} />
                        </>
                    )}
                    <Form.Control type="file" name="file" placeholder="Upload an image" onChange={uploadImage} />


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
                            <input type="text" id="spf" className="form-control" defaultValue={product.spf} onChange={handleInput} />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="comment">Comments</label>
                            <input as="textarea" id="comment" className="form-control" onChange={handleInput} defaultValue={product.comment} onChange={handleInput} />
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