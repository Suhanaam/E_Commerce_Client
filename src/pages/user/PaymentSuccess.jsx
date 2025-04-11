import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

export const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Processing your order...");

  useEffect(() => {
    const createOrder = async () => {
      try {
        const sessionId = localStorage.getItem("sessionId");
        const deliveryAddress = JSON.parse(localStorage.getItem("deliveryAddress"));

        // Get cart data from backend to include in order
        const { data } = await axiosInstance.get("/cart", { withCredentials: true });

        const payload = {
          items: data.cart.items,
          sessionId,
          deliveryAddress,
        };

        const response = await axiosInstance.post("/orders/create", payload, {
          withCredentials: true,
        });

        console.log("Order created:", response.data);
        setMessage("Order placed successfully!");
        localStorage.removeItem("sessionId");
        localStorage.removeItem("deliveryAddress");

        // Optionally clear cart or navigate after delay
        setTimeout(() => navigate("/orders"), 2000);
      } catch (error) {
        console.error(error);
        setMessage("Something went wrong creating the order.");
      }
    };

    createOrder();
  }, [navigate]);

  return (
    <div className="p-6 text-center text-xl text-green-600 font-bold">
      {message}
    </div>
  );
};
