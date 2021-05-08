import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Container, Card, Button, Modal, Row, Col, Form } from "react-bootstrap";
import { ProductList } from "../products/ProductList";
import { ProductContext } from "../../providers/ProductProvider";


export const UserProfileDetails = () => {

    const { getUserProfileById } = useContext(UserProfileContext);
    const { products, getProductsByUser } = useContext(ProductContext);
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

    console.log(products, "products")

    return (
        <>
            <Container>
                <Card className="card">
                    <img className="userProfilePicture" src={userProfile.imageLocation} />
                    <h1>{userProfile.firstName} {userProfile.lastName}</h1>
                    <h2>Age: {userProfile.age}</h2>
                    <h2>Skin Type {userProfile.skinTypeId}</h2>
                    {currentUser.id === userId ?
                        <><Button className="finish__btn" variant="primary" size="sm"
                            onClick={handleShow}>Add Product</Button></>
                        :
                        <><Button className="finish__btn" variant="primary" size="sm"
                            onClick={handleShow}>Oink</Button></>
                    }
                </Card>
                <Card className="card">
                    <h2>Sun Protection Favorites</h2>
                    {products.map((product) => (
                        <div className="product-card" key={product.id}>
                            {/* Link to show product card details */}
                            <Link to={`/product/GetById/${product.id}`}>
                                <img className="userProfilePicture" src={product.imageLocation} />
                                <h3 className="posts-title">
                                    {product.name}
                                </h3>
                            </Link>
                        </div>
                    ))}
                </Card>
            </Container>

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
