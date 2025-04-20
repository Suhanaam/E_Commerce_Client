import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

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

        setMessage("🎉 Order placed successfully!");
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
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4 text-green-500">
          <CheckCircle className="w-20 h-20" />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Payment Success</h1>
        <p className="text-gray-700 text-lg">{message}</p>
        <p className="text-sm text-gray-500 mt-2">You will be redirected shortly...</p>
      </div>
    </div>
  );
};
