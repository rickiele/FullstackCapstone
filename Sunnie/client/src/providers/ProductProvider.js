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


    return (
        <ProductContext.Provider value={{ products, getProductsByUser }}>
            {props.children}
        </ProductContext.Provider>
    );
};