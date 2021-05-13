import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Container, Card, Row, Col } from "react-bootstrap";
import { AddProduct } from "../products/AddProduct";
import { ProductContext } from "../../providers/ProductProvider";
import { ProductCard } from "../products/ProductCard";
import { UpdateUserProfile } from "./UpdateUserProfile";
import { FavoriteList } from "../favorites/FavoriteList";

export const UserProfileDetails = () => {

    // UseContext
    const { getUserProfileById } = useContext(UserProfileContext);
    const { products, getProductsByUser } = useContext(ProductContext);

    // Use States
    const [userProfile, setUserProfile] = useState({ userProfile: {} });

    // Get the userProfileId
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const { userProfileId } = useParams()
    const userId = parseInt(userProfileId)

    // Show the user Profile
    // If the state of user profile changed - we need to grab the updated state
    // On the initial render
    useEffect(() => {
        getUserProfileById(userId)
            .then((response) => {
                setUserProfile(response)
            }).then(() => getProductsByUser(userId))
    }, []);

    // After there has been a change to the userProfile state
    // Second argument to the useEffect, when you want this useEffect to 
    // run when the userProfile state changes / An array
    // useEffect(() => {
    //     getUserProfileById(userId)
    //         .then((response) => {
    //             setUserProfile(response)
    //         }).then(() => getProductsByUser(userId))
    // }, [userProfile]);

    // Dictates when the useEffect function should execute 
    // When user profile changes, will run the useEffect again

    //Parent component doesn't keep track of child's states
    // JSX for the 'User Profile' details
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Card className="card">
                            <img className="userProfilePicture" src={userProfile.imageLocation} />
                            <h1>{userProfile.firstName} {userProfile.lastName}</h1>
                            <h2>Age: {userProfile.age}</h2>
                            <h2>Skin Type {userProfile.skinTypeId}</h2>
                            {currentUser.id === userId ?
                                <><UpdateUserProfile key={userProfile.id} userProfile={userProfile} setUserProfile={setUserProfile} /></>
                                :
                                <></>
                            }
                        </Card>
                    </Col>
                    <Col>
                        <Card className="card">
                            <h2>Sun Protection Favorites</h2>
                            <FavoriteList />
                        </Card>
                        {currentUser.id === userId ?
                            <>
                                <Card>
                                    <AddProduct key={currentUser.id} userProfile={userProfile} />
                                    <h2>Product Log</h2>
                                    <p>Get all products by userProfileId</p>
                                    {products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </Card>
                            </>
                            :
                            <></>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
};
