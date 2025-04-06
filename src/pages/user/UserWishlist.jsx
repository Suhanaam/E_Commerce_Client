import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

export const UserWishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]); // Initialized as []

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get("/wishlist/");
        console.log("Fetched wishlist", response.data);

        // Check if 'products' is returned properly
        if (response.data?.products) {
          setWishlistProducts(response.data.products);
        } else {
          setWishlistProducts([]); // fallback if empty or malformed
        }
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
        setWishlistProducts([]); // fallback to empty array on error
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>

      {wishlistProducts.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {wishlistProducts.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold">{product.name}</h3>
              <p className="text-gray-600">Price: ₹{product.price}</p>
              <Link
                to={`/user/productList2/${product._id}`}
                className="text-blue-500 mt-2 inline-block"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
