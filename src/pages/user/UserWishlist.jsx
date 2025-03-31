import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

export const UserWishlist = () => {
    const [wishlist, setWishlist] = useState([]);
  
    useEffect(() => {
      const fetchWishlist = async () => {
        try {
          const response = await axiosInstance.get("/wishlist/");
          setWishlist(response.data.products);
        } catch (error) {
          console.error("Failed to fetch wishlist", error);
        }
      };
      fetchWishlist();
    }, []);
  
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold">My Wishlist</h2>
        {wishlist.map((product) => (
          <div key={product._id} className="border p-4 my-2">
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    );
  };
