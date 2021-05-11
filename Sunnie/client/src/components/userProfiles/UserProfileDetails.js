import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Container, Card, Button, Tab, Tabs, Col, Row } from "react-bootstrap";
import { AddProduct } from "../products/AddProduct";
import { ProductContext } from "../../providers/ProductProvider";
import { ProductCard } from "../products/ProductCard";
import { UpdateUserProfile } from "./UpdateUserProfile";
import { FavoriteList } from "../favorites/FavoriteList";


export const UserProfileDetails = () => {
    const { getUserProfileById } = useContext(UserProfileContext);
    const { products, getAllProducts, getProductsByUser } = useContext(ProductContext);

    const [userProfile, setUserProfile] = useState({ userProfile: {} });
    const [product, setProduct] = useState([]);

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const { userProfileId } = useParams()

    const userId = parseInt(userProfileId)

    useEffect(() => {
        getUserProfileById(userProfileId)
            .then((response) => {
                setUserProfile(response)
            })
        getProductsByUser(userProfileId)
    }, []);

    console.log(userProfileId, "userProfileId", userId, "userId")

    return (
        <>
            <Container>
                <Card className="card">
                    <img className="userProfilePicture" src={userProfile.imageLocation} />
                    <h1>{userProfile.firstName} {userProfile.lastName}</h1>
                    <h2>Age: {userProfile.age}</h2>
                    <h2>Skin Type {userProfile.skinTypeId}</h2>
                    {currentUser.id === userId ?
                        <><UpdateUserProfile key={userProfile.id} userProfile={userProfile} /></>
                        :
                        <></>
                    }
                </Card>
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
            </Container>
        </>
    )
};
