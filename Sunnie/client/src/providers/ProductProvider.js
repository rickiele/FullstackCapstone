import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ProductContext = React.createContext();

export const ProductProvider = (props) => {
    const [products, setProducts] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

    const getProductsByUser = () => {
        return getToken().then((token) =>
            fetch(`/api/product/GetByUser?userId=${userProfile.id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setProducts));
    };

    const addProduct = productObj => {
        return getToken().then((token) =>
            fetch(`/api/product/add`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productObj)
            }));
    };

    const deleteProduct = (productId) => {
        return getToken()
            .then((token) =>
                fetch(`/api/product/delete/${productId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                    .then(setProducts)
            )
    }


    return (
        <ProductContext.Provider value={{ products, getProductsByUser, addProduct, deleteProduct }}>
            {props.children}
        </ProductContext.Provider>
    );
};