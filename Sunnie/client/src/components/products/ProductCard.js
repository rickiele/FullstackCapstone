import React from "react";
import { Link } from "react-router-dom";
import { Container, Card } from "react-bootstrap";


export const ProductCard = ({ product }) => {

    return (
        <Card>
            {product.name}
        </Card>

    )
}