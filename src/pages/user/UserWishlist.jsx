import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

export const UserWishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get("/wishlist", {
          withCredentials: true, // if using cookies
        });
        setWishlistProducts(response.data.wishlist.products || []);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };

    fetchWishlist();
  }, []);

  if (!wishlistProducts.length) {
    return <p>Your wishlist is empty.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {wishlistProducts.map((product) => (
          <div key={product._id} className="border rounded-xl p-4 shadow-lg">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.brand}</p>
            <p className="text-md font-bold text-green-600">₹{product.price}</p>
            <Link to={`/product/${product._id}`}>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Product
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
