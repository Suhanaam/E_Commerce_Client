import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

export const UserOrder = () => {
    const [orders, setOrders] = useState([]);
    const { userData } = useSelector((state) => state.user);
  
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await axiosInstance.get("/order/user");
          setOrders(response.data);
        } catch (error) {
          console.error("Failed to fetch orders", error);
        }
      };
      fetchOrders();
    }, []);
  
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold">My Orders</h2>
        {orders.map((order) => (
          <div key={order._id} className="border p-4 my-2">
            <p>Total: ${order.totalAmount}</p>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>
    );
  };
  