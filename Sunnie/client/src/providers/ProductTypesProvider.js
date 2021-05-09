import userEvent from "@testing-library/user-event";
import React, { useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider"

export const ProductTypeContext = React.createContext();

export const ProductTypeProvider = (props) => {
    const [productType, setproductType] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const getAllProductTypes = () =>
        getToken().then((token) =>
            fetch("", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setproductType));

    return (
        <ProductTypeContext.Provider value={{ productType, getAllProductTypes }}>
            {props.children}
        </ProductTypeContext.Provider>
    );
};

export default ProductTypeProvider;