import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance"; 

export const AdminViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/admin/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">User</th>
            <th className="border p-2">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="text-center">
              <td className="border p-2">{order.user.name}</td>
              <td className="border p-2">${order.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
