import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";

export const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/order/user", {
          withCredentials: true,
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-4 mb-6 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Order ID: {order._id}</p>
            <p className="font-medium text-lg mb-2">
              Ordered on: {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="mb-2">
              <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
              <p><strong>Payment Status:</strong> <span className="text-blue-600">{order.paymentStatus}</span></p>
              <p><strong>Delivery Status:</strong> <span className="text-green-700">{order.deliveryStatus}</span></p>
            </div>

            <div className="mb-2">
              <p className="font-medium">Delivery Address:</p>
              <p>{order.deliveryAddress.name}, {order.deliveryAddress.phone}</p>
              <p>{order.deliveryAddress.address}, {order.deliveryAddress.pincode}</p>
            </div>

            <div className="mt-2">
              <p className="font-medium mb-1">Products:</p>
              <ul className="list-disc ml-6 text-gray-800">
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.product?.name || "Product removed"} — Qty: {item.quantity}, Price: ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
