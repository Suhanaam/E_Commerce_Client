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
  const [statusFilter, setStatusFilter] = useState("All");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get("/order/all", {
          withCredentials: true,
        });
        console.log("🟢 Fetched Orders:", response.data);

        // ✅ FIXED LINE HERE
        setOrders(response.data || []);
      } catch (error) {
        setError("Failed to fetch orders. Please try again later.");
        console.error("❌ Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders =
    statusFilter === "All"
      ? orders
      : orders.filter((order) => order.deliveryStatus === statusFilter);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Orders</h2>

      {/* Filter */}
      <div className="mb-4 flex items-center gap-4">
        <label>Status Filter:</label>
        <select
          className="border px-2 py-1 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
        </select>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p>No matching orders found.</p>
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
              {filteredOrders.map((order) => (
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
