import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const statusColors = {
  Pending: "bg-red-500",
  Processing: "bg-yellow-400",
  Shipped: "bg-green-500",
};

export const AdminViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get("/order/all", {
          withCredentials: true,
        });
        setOrders(response.data.orders || []);
      } catch (error) {
        setError("Failed to fetch orders. Please try again later.");
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Orders</h2>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">View Details</th>
                <th className="p-2 border">Delivery Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="p-2 border">{order._id}</td>
                  <td className="p-2 border">
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="text-blue-500 underline"
                    >
                      View Details
                    </Link>
                  </td>
                  <td className="p-2 border">
                    <span
                      className={`text-white text-sm px-2 py-1 rounded ${
                        statusColors[order.deliveryStatus] || "bg-gray-500"
                      }`}
                    >
                      {order.deliveryStatus}
                    </span>
                  </td>
                  <td className="p-2 border">
                    {/* Example action — you can expand with more controls */}
                    {order.deliveryStatus === "Pending" && (
                      <button className="bg-blue-500 text-white px-2 py-1 rounded">
                        Accept
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
