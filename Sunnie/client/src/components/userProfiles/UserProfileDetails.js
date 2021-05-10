import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Container, Card, Button, Tab, Tabs, Col, Row } from "react-bootstrap";
import { AddProduct } from "../products/AddProduct";
import { ProductContext } from "../../providers/ProductProvider";
import { ProductCard } from "../products/ProductCard";


export const UserProfileDetails = () => {
    const { getUserProfileById } = useContext(UserProfileContext);
    const { products, getAllProducts, getProductsByUser } = useContext(ProductContext);

    const [userProfile, setUserProfile] = useState({ userProfile: {} });
    const [product, setProduct] = useState([]);

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const { userProfileId } = useParams()

    const userId = parseInt(userProfileId)

    useEffect(() => {
        getUserProfileById(userId)
            .then((response) => {
                setUserProfile(response)
            })
        getProductsByUser(userId)
    }, [])


    //Only showing me the logged in user's products, despite the userId from useParams changing

    // const filteredByUser = products.filter(product.userProfileId !== userId)
    // console.log(filteredByUser, "userProfileDetails")

    console.log(userId, "useParams")
    console.log(products, "products")

    // Favorites to only have favorite button and unfavorite
    // Products to only have edit and delete in modal
    return (
        <>
            <Container>
                <Card className="card">
                    <img className="userProfilePicture" src={userProfile.imageLocation} />
                    <h1>{userProfile.firstName} {userProfile.lastName}</h1>
                    <h2>Age: {userProfile.age}</h2>
                    <h2>Skin Type {userProfile.skinTypeId}</h2>
                    {product.userProfileId === userId ?
                        <><Button>Edit Profile</Button></>
                        :
                        <></>
                    }
                </Card>
                <Card className="card">
                    <h2>Sun Protection Favorites</h2>
                    <p>Pull from favorites table where it matches the userProfileId</p>
                </Card>
                <Card>

                    <AddProduct key={currentUser.id} userProfile={userProfile} />
                    <h2>Product Log</h2>
                    <p>Get all products by userProfileId</p>

                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </Card>
            </Container>
        </>
    )
};


// {products.map((product) => (
//     <div className="product-card" key={product.id}>
//         {/* Link to show product card details */}
//         <Link to={`/product/GetById/${product.id}`}>
//             <img className="userProfilePicture" src={product.imageLocation} />
//             <h3 className="posts-title">
//                 {product.name}
//             </h3>
//         </Link>
//     </div>
// ))}

{/* {
                        products.filter(product.UserProfileId === userId).map(filteredProducts => {
                            return <ProductCard key={product.id} product={product} />
                        })
                    } */}


                    // {products.filter(product.userProfileId === userId).map(filteredProducts => (
                    //     <ProductCard key={product.id} product={product} />
                    // ))}