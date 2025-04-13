import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

const statusColors = {
  Pending: "bg-red-500",
  Processing: "bg-yellow-400",
  Shipped: "bg-green-500",
  Delivered: "bg-blue-600",
  Cancelled: "bg-gray-500",
};

export const AdminViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  const updateOrderDeliveryStatus = async (order) => {
    const allShipped = order.items.every((item) => item.productDeliveryStatus === "Shipped");
    const allProcessing = order.items.every((item) => item.productDeliveryStatus === "Processing");

    let newStatus = "Pending";
    if (allShipped) newStatus = "Shipped";
    else if (allProcessing) newStatus = "Processing";

    if (order.deliveryStatus !== newStatus) {
      try {
        await axiosInstance.put(
          `/admin/order/${order._id}/set-delivery-status`,
          { status: newStatus },
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Failed to update delivery status", error);
      }
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/order/all", {
        withCredentials: true,
      });
      setOrders(res.data);

      for (let order of res.data) {
        await updateOrderDeliveryStatus(order);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleMarkShipped = async (orderId) => {
    try {
      await axiosInstance.put(`/admin/order/${orderId}/set-shipped`, {}, {
        withCredentials: true,
      });
      fetchOrders();
    } catch (error) {
      console.error("Failed to mark as shipped", error);
    }
  };
//cancel the order
  const handleCancelOrder = async (orderId) => {
    try {
      await axiosInstance.put(`/admin/order/${orderId}/cancel`, {}, {
        withCredentials: true,
      });
      fetchOrders();
    } catch (error) {
      console.error("Failed to cancel order", error);
    }
  };

  // mark as delivered
  const handleMarkDelivered = async (orderId) => {
    try {
      await axiosInstance.put(`/admin/order/${orderId}/set-delivered`, {}, {
        withCredentials: true,
      });
      fetchOrders();
    } catch (error) {
      console.error("Failed to mark as delivered", error);
    }
  };
  


  // Filter orders based on overall delivery status
  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) => order.deliveryStatus === filterStatus);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Panel - Orders</h2>

      {/* Filter */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Delivery Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-1 rounded"
        >
         <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">products</th>
                <th className="p-2 border">View</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
            {filteredOrders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="p-2 border">{order._id}</td>
                  <td className="p-2 border">
                    <ul className="list-disc list-inside text-left">
                      {order.items.map((item, idx) => (
                        <li key={idx}>{item.product.name}-<span className={`text-white text-sm px-2 py-1 rounded ${statusColors[item.productDeliveryStatus]}`}>
                        {item.productDeliveryStatus}
                      </span></li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-2 border">
                    <span
                      className={`text-white text-sm px-2 py-1 rounded ${statusColors[order.deliveryStatus]}`}
                    >
                      {order.deliveryStatus}
                    </span>
                  </td>
                  <td className="p-2 border">
                    <Link
                      to={`/admin/order/${order._id}`}
                      className="text-blue-600 underline"
                    >
                      View
                    </Link>
                  </td>
                  <td className="p-2 border">
  {order.items.every((item) => item.productDeliveryStatus === "Processing") ? (
    <button
      onClick={() => handleMarkShipped(order._id)}
      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
    >
      Mark as Shipped
    </button>
  ) : null}
  
               { order.deliveryStatus === "Shipped" && order.deliveryStatus !== "Delivered" ? (
                      <button
                        onClick={() => handleMarkDelivered(order._id)}
                        className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
                      >
                        Mark as Delivered
                      </button>
                    ) : null}



                 {  order.deliveryStatus !== "Cancelled" && order.deliveryStatus !== "Delivered" && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Cancel Order
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
