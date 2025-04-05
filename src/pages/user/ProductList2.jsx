import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { Skeltons } from "../../components/user/Skeltons";

export const ProductList2 = () => {
    const params = useParams();
    const [productDetails, isLoading, error] = useFetch(`/products/${params?.id}`);

    const handleAddToCart = async () => {
        if (!productDetails?.data) {
            toast.error("Product not found");
            return;
        }

        try {
            const response = await axiosInstance({
                method: "POST",
                url: "/cart/add",
                data: {
                    product: productDetails.data._id,
                    quantity: 1,
                    price: productDetails.data.price,
                },
                withCredentials: true, // ✅ Make sure cookies (for auth) are sent
            });

            console.log("Add to cart response:", response);
            toast.success("Product added to cart!");
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error(error?.response?.data?.message || "Unable to add product to cart");
        }
    };

    if (isLoading) return <Skeltons />;
    if (error) return <p>Error loading product</p>;

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Product Details</h1>

            {productDetails?.data ? (
                <div className="card w-96 bg-base-100 shadow-md">
                    <figure>
                        <img
                            src={`https://e-commerce-server-rayan.onrender.com/${productDetails.data.images}`}
                            alt={productDetails.data.name}
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{productDetails.data.name}</h2>
                        <p>{productDetails.data.description}</p>
                        <p><strong>Price:</strong> ${productDetails.data.price}</p>

                        <button className="btn btn-primary mt-4" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            ) : (
                <p>No product found</p>
            )}
        </div>
    );
};
