import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { FavoriteCard } from "./FavoriteCard";
import { Container, Button, Dropdown } from "react-bootstrap"
import { FavoriteContext } from "../../providers/FavoriteProvider";

export const FavoriteList = () => {
    const { favorites, getFavoritesByUserProfileId } = useContext(FavoriteContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);

    useEffect(() => {
        getFavoritesByUserProfileId(userId);
    }, []);

    const favoritesArray = getFavoritesByUserProfileId(userId);
    console.log(favorites, userId, "favoritesList");

    return (
        <Container className="container">
            {/* {
                favorites.map((favorite) => (
                    <FavoriteCard key={favorite.id} favorite={favorite} />
                ))
            } */}

        </Container>
    );
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
