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

        if (!sessionId || !deliveryAddress) {
          setMessage("Missing session ID or address. Cannot place order.");
          return;
        }

        const { data } = await axiosInstance.get("/cart", {
          withCredentials: true,
        });

        if (!data?.cart?.items || data.cart.items.length === 0) {
          setMessage("Your cart is empty. Cannot place order.");
          return;
        }

        const payload = {
          sessionId,
          items: data.cart.items,
          deliveryAddress,
        };

        const response = await axiosInstance.post("/order/create", payload, {
          withCredentials: true,
        });
        await axiosInstance.delete("/cart/clear", { withCredentials: true });
        setMessage("Order placed successfully!");

        localStorage.removeItem("sessionId");
        localStorage.removeItem("deliveryAddress");

        setTimeout(() => navigate("/user/order"), 2000);
      } catch (error) {
        console.error("Error creating order:", error.response?.data || error.message);
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
