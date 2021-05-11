import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FavoriteCard } from "./FavoriteCard";
import { Container, Button, Dropdown, Card } from "react-bootstrap"
import { FavoriteContext } from "../../providers/FavoriteProvider";
import { ProductContext } from "../../providers/ProductProvider";


export const FavoriteList = () => {
    const { products, getProductsByUser, getAllProducts } = useContext(ProductContext);
    const { favorites, getFavoritesByUserProfileId } = useContext(FavoriteContext);
    const { userProfileId } = useParams();
    const userId = parseInt(userProfileId);

    const [favorite, setFavorite] = useState({});

    useEffect(() => {
        getFavoritesByUserProfileId(userId)
            .then((res) => {
                setFavorite(res)
            })
    }, []);

    console.log(favorites, "favorites");

    return (
        <Container className="container">
            {
                favorites.map((favorite) => (
                    <FavoriteCard key={favorite.id} favorite={favorite} />
                ))
            }
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
