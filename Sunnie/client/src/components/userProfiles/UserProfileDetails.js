import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Card, Modal, Row, Col } from "react-bootstrap";
import { ProductList } from "../products/ProductList";
import { ProductContext } from "../../providers/ProductProvider";


export const UserProfileDetails = () => {

    const { getUserProfileById } = useContext(UserProfileContext);
    const { getProductsByUser } = useContext(ProductContext);

    const [userProfile, setUserProfile] = useState({ userProfile: {} });
    const [product, setProduct] = useState([]);

    const { userProfileId } = useParams()

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




    console.log(product, "products array")

    return (
        <section>
            <Row>
                <Col md={3}>
                    <Card className="userDetails">
                        <h3>Profile pic here</h3>
                        <h3>{userProfile.firstName} {userProfile.lastName}</h3>
                        <h3>Age: {userProfile.age}</h3>
                        <h3>Skin Type {userProfile.skinTypeId}</h3>
                    </Card>
                </Col>
                <div>

                </div>
            </Row>
        </section>

    )
}
