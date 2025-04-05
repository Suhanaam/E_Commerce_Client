import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Skeltons } from "../../components/user/Skeltons";

import { ProductCard2 } from "../../components/user/ProductCard2";

export const ProductList = () => {
    const params = useParams();
    const [product, isLoading, error] = useFetch(`/products/${params.id}`);

    if (isLoading) {
        return <Skeltons />;
    }

    if (error) {
        return <p>Error loading product</p>;
    }

    return (
        <div>
            <h1>Product Details</h1>
            {product ? <ProductCard2 product={product} /> : <p>No product found</p>}
        </div>
    );
};
