import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

export const UserWishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get("/wishlist", {
          withCredentials: true, // ✅ important for auth!
        });
        setWishlistProducts(response.data.wishlist?.products || []);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };
    fetchWishlist();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      {wishlistProducts.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        wishlistProducts.map((product) => (
          <div key={product._id} className="border p-4 my-2 shadow rounded">
            <p className="font-semibold">{product.name}</p>
            <img src={product.images?.[0]} alt={product.name} className="w-24 h-24 object-cover mt-2" />
          </div>
        ))
      )}
    </div>
  );
};
