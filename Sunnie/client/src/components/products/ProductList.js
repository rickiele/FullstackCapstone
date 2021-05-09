import React, { useContext, useEffect } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { ProductContext } from "../../providers/ProductProvider";
import { ProductCard } from "./ProductCard";

export const ProductList = () => {

    const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext);
    const { products, getProductsByUser } = useContext(ProductContext);

    useEffect(() => {
        getProductsByUser();
    }, []);

    return (
        <div>
            {/* <h3>Products</h3>
            {
                products.map(product => {
                    return <ProductCard key={product.id} product={product} />
                })
            } */}
        </div>
    );
}