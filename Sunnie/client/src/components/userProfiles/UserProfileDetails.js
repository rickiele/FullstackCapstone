import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Card, Button, Modal, Row, Col, Form } from "react-bootstrap";
import { ProductList } from "../products/ProductList";
import { ProductContext } from "../../providers/ProductProvider";


export const UserProfileDetails = () => {

    const { getUserProfileById } = useContext(UserProfileContext);
    const { getProductsByUser } = useContext(ProductContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

    const [userProfile, setUserProfile] = useState({ userProfile: {} });
    const [product, setProduct] = useState([]);

    const { userProfileId } = useParams()

    const userId = parseInt(userProfileId)

    useEffect(() => {
        getUserProfileById(userProfileId)
            .then((response) => {
                setUserProfile(response)
            })
        getProductsByUser(userProfileId)
            .then((response) => {
                setProduct(response)
            })
    }, [])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(userId, currentUser.id, "hello")

    return (
        <>
            <div>
                <Card className="userDetails">
                    <h3>Profile pic here</h3>
                    <h3>{userProfile.firstName} {userProfile.lastName}</h3>
                    <h3>Age: {userProfile.age}</h3>
                    <h3>Skin Type {userProfile.skinTypeId}</h3>
                </Card>
            </div>

            {currentUser.id === userId ?
                <><Button className="finish__btn" variant="primary" size="sm"
                    onClick={handleShow}>Add Product</Button></>
                :
                <><Button className="finish__btn" variant="primary" size="sm"
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
                        <input type="text" id="finishDate" required className="form-control" />
                    </Form.Group>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="rating">Type</label>
                            <select name="rating" id="rating" className="form-control" >
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
                            <label htmlFor="shelfId">Reshelve?</label>
                            <select name="shelfId" id="shelf.id" className="form-control">
                                <option value="0">Choose a shelf</option>
                                <option value="1">Currently Reading</option>
                                <option value="2">Book Club</option>
                                <option value="3">Mystery</option>
                                <option value="4">Historical Fiction</option>
                                <option value="5">Beach Read</option>
                            </select>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="name">SPF</label>
                            <input type="text" id="finishDate" required className="form-control" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="name">Comments</label>
                            <input as="textarea" id="finishDate" required className="form-control" />
                        </div>
                    </fieldset>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">Add Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
