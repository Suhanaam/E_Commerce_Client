import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const statusColors = {
  Pending: "bg-red-500",
  Processing: "bg-yellow-400",
  Shipped: "bg-green-500",
};

export const SellerViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");

  const ORDERS_PER_PAGE = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/order/seller-orders", {
          withCredentials: true,
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleAcceptOrder = async (orderId, productId) => {
    try {
      await axiosInstance.put(
        `/seller/order/${orderId}/product/${productId}/accept`,
        {},
        {
          withCredentials: true,
        }
      );
      // Refresh data
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                items: order.items.map((item) =>
                  item.product._id === productId
                    ? {
                        ...item,
                        productDeliveryStatus: "Processing",
                      }
                    : item
                ),
              }
            : order
        )
      );
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const filteredOrders = orders.filter((order) =>
    statusFilter === "All"
      ? true
      : order.items.some(
          (item) => item.productDeliveryStatus === statusFilter
        )
  );

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Seller Orders</h2>

      <div className="mb-4 flex items-center gap-4">
        <label>Status Filter:</label>
        <select
          className="border px-2 py-1 rounded"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
        </select>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) =>
                order.items.map((item, index) => (
                  <tr key={`${order._id}-${index}`} className="text-center">
                    <td className="p-2 border">{order._id}</td>
                    <td className="p-2 border">{item.product.name}</td>
                    <td className="p-2 border">{item.quantity}</td>
                    <td className="p-2 border">₹{item.price}</td>
                    <td className="p-2 border">
                      <span
                        className={`text-white text-sm px-2 py-1 rounded ${statusColors[item.productDeliveryStatus]}`}
                      >
                        {item.productDeliveryStatus}
                      </span>
                    </td>
                    <td className="p-2 border space-x-2">
                      {item.productDeliveryStatus === "Pending" && (
                        <button
                          onClick={() =>
                            handleAcceptOrder(order._id, item.product._id)
                          }
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Accept
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({
          length: Math.ceil(filteredOrders.length / ORDERS_PER_PAGE),
        }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === idx + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
