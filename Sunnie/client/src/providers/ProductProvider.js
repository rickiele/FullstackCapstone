import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ProductContext = React.createContext();

export const ProductProvider = (props) => {
    const [products, setProducts] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));


    const getAllProducts = () => {
        return getToken().then((token) =>
            fetch(`/api/product`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setProducts));
    };

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
        return getToken().then((token) =>
            fetch(`/api/product/delete/${productId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then(setProducts)
        )
    }

    const updateProduct = (product) =>
        getToken().then((token) =>
            fetch(`/api/product/update/${product.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            })
        )


    return (
        <ProductContext.Provider value={{ products, getAllProducts, getProductsByUser, addProduct, deleteProduct, updateProduct }}>
            {props.children}
        </ProductContext.Provider>
    );
};