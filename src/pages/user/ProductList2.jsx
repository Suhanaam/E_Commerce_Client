import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { Skeltons } from "../../components/user/Skeltons";

export const ProductList2 = () => {
    const params = useParams();
    console.log("hiii");
    const [productDetails, isLoading, error] = useFetch(`/products/${params?.id}`);
    console.log("Fetched product data:", productDetails);


    const handleAddToCart = async () => {
        console.log("Product passed to cart:", productDetails);
        console.log("Product ID:", productDetails?._id);
        console.log("Add to cart payload:", {
            product: productDetails._id,
            quantity: 1,
            price: productDetails?.price
          });
          


        if (!productDetails) {
            toast.error("Product not found");
            return;
        }

        try {
            const response = await axiosInstance({
                method: "POST",
                url: "/cart/add",
                data: {
                    product: productDetails?._id,
                    quantity: 1,
                    price: productDetails?.price,
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

    const handleAddToWishlist = async () => {
        if (!productDetails?._id) {
            toast.error("Product not found");
            return;
        }
    
        try {
            const response = await axiosInstance({
                method: "POST",
                url: "/wishlist/add",
                data: {
                    product: productDetails._id,
                },
                withCredentials: true,
            });
    
            console.log("Add to wishlist response:", response);
            toast.success("Product added to wishlist!");
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            toast.error(error?.response?.data?.message || "Unable to add product to wishlist");
        }
    };

    const handleViewReview =async()=>{
        try {
            const response = await axiosInstance.get("/review/productDetails?._id", {
                      withCredentials: true,
                    });

                    console.log(response.data);
            
        } catch (error) {
            toast.error("unable to fetch reviews of",productDetails?._id);
        }
    }

    if (isLoading) return <Skeltons />;
    if (error) return <p>Error loading product</p>;
    

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Product Details are here </h1>
            
            
                <div className="card w-96 bg-base-100 shadow-md">
                    <figure>
                    <img
                     src={productDetails?.images?.[0] }
                     alt={productDetails?.name}
                    />

                    </figure>
                    <div className="card-body">
                    <h2 className="card-title">{productDetails?.name}</h2>
                      <p>{productDetails?.description}</p>
                      <p><strong>Price:</strong> ${productDetails?.price}</p>

                        <button className="btn btn-primary mt-4" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                        <button className="btn btn-primary mt-4" onClick={handleAddToWishlist}>
                            Add to wishlist
                        </button>
                        <button className="btn btn-primary mt-4" onClick={handleViewReview}>
                            ViewReview
                        </button>
                        
                        
                    </div>
                </div>
        
        </div>
    );
};
