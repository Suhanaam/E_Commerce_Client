import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

export const UserCart = () => {
  const [cartData, setCartData] = useState([]); // Ensure it's always an array
  const { userData } = useSelector((state) => state.user);
  console.log("cart user:",userData)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get("/cart", {
          withCredentials: true, // 🔐 Needed for cookie-based auth
        });

        console.log("cart user:", response.data);
    
        setCartData(response.data.cart?.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
  
    if (userData?._id) {
      fetchCart();
    }
  }, [userData]);
  

  if (!cartData.length) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h2>User Cart</h2>
      <ul>
        {cartData.map((item) => (
          <li key={item.product._id}>
            {item.product.name} - {item.quantity} x ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};


