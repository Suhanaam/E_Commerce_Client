import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const statusColors = {
  Pending: "bg-red-500",
  Processing: "bg-yellow-400",
  Shipped: "bg-green-500",
};

export const AdminViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [error, setError] = useState(null);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get("/order/all", {
          withCredentials: true,
        });
        console.log("Orders API response:", response.data);
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

  const handleSellerAccept = async (orderId, productId) => {
    try {
      await axiosInstance.put(
        `/admin/order/${orderId}/product/${productId}/accept`,
        {},
        { withCredentials: true }
      );
      await checkIfAllProcessed(orderId);
      alert("Product accepted successfully!");
    } catch (error) {
      console.error("Error accepting product:", error);
    }
  };

  const checkIfAllProcessed = async (orderId) => {
    try {
      const response = await axiosInstance.get(
        `/admin/order/${orderId}/check-processing`,
        { withCredentials: true }
      );

      if (response.data.allProcessed) {
        await axiosInstance.put(
          `/admin/order/${orderId}/set-processing`,
          {},
          { withCredentials: true }
        );
      }
    } catch (error) {
      console.error("Error checking order processing status:", error);
    }
  };

  // Flatten all order items for easy filtering and pagination
  const allItems = orders.flatMap((order) =>
    order.items.map((item) => ({
      ...item,
      orderId: order._id,
      orderDeliveryStatus: order.deliveryStatus,
    }))
  );

  // Filter by product delivery status
  const filteredItems =
    statusFilter === "All"
      ? allItems
      : allItems.filter((item) => item.productDeliveryStatus === statusFilter);

  // Paginate items
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Order Management</h2>

      {/* Filter */}
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

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading */}
      {loading ? (
        <p>Loading orders...</p>
      ) : paginatedItems.length === 0 ? (
        <p>No matching orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Seller</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item, index) => (
                <tr key={`${item.orderId}-${item.product?._id}-${index}`} className="text-center">
                  <td className="p-2 border">{item.orderId}</td>
                  <td className="p-2 border">{item?.product?.name}</td>
                  <td className="p-2 border">{item?.seller || "Unknown"}</td>
                  <td className="p-2 border">{item?.quantity}</td>
                  <td className="p-2 border">₹{item?.price}</td>
                  <td className="p-2 border">
                    <span
                      className={`text-white text-sm px-2 py-1 rounded ${
                        statusColors[item?.productDeliveryStatus] || "bg-gray-500"
                      }`}
                    >
                      {item?.productDeliveryStatus}
                    </span>
                  </td>
                  <td className="p-2 border space-x-2">
                    {item.productDeliveryStatus !== "Shipped" && (
                      <button
                        onClick={() =>
                          handleSellerAccept(item.orderId, item.product._id)
                        }
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
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

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          className="px-3 py-1 rounded border"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({
          length: Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
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
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(
                Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
                prev + 1
              )
            )
          }
          className="px-3 py-1 rounded border"
          disabled={
            currentPage === Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};
