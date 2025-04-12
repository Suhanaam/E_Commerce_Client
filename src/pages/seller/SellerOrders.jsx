import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

export const SellerOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchSellerOrders = async () => {
    try {
      const res = await axiosInstance.get("/order/seller-orders", {
        withCredentials: true,
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch seller orders", err);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(
        `/order/update-delivery-status/${orderId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      fetchSellerOrders(); // Refresh list
    } catch (err) {
      console.error(`Failed to update order to ${newStatus}`, err);
    }
  };

  useEffect(() => {
    fetchSellerOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Seller Orders</h2>
      <div className="overflow-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Items</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-2 border">{order.user?.name || "User"}</td>
                <td className="p-2 border">
                  {order.items.map((item) => (
                    <div key={item.product._id} className="mb-2">
                      <img
                        src={item.product.images?.[0]}
                        alt={item.product.name}
                        className="inline-block w-12 h-12 mr-2 object-cover"
                      />
                      {item.product.name} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="p-2 border">{order.deliveryStatus}</td>
                <td className="p-2 border space-x-2">
                  {order.deliveryStatus === "Pending" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(order._id, "Processing")}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(order._id, "Cancelled")}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {order.deliveryStatus === "Processing" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(order._id, "Shipped")}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Mark as Shipped
                      </button>
                      <button
                        onClick={() => handleStatusChange(order._id, "Cancelled")}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {order.deliveryStatus === "Shipped" && (
                    <button
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Mark as Delivered
                    </button>
                  )}

                  {["Delivered", "Cancelled"].includes(order.deliveryStatus) && (
                    <span className="text-green-700 font-semibold capitalize">
                      {order.deliveryStatus}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
