import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

export const AdminViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/admin/orders", {
          withCredentials: true,
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSellerAccept = async (orderId, productId) => {
    try {
      await axiosInstance.put(`/admin/order/${orderId}/product/${productId}/accept`, {}, {
        withCredentials: true,
      });
      // After product accepted, check if all products are processed
      await checkIfAllProcessed(orderId);
    } catch (error) {
      console.error("Error accepting product:", error);
    }
  };

  const checkIfAllProcessed = async (orderId) => {
    try {
      const response = await axiosInstance.get(`/admin/order/${orderId}/check-processing`, {
        withCredentials: true,
      });

      if (response.data.allProcessed) {
        await axiosInstance.put(`/admin/order/${orderId}/set-processing`, {}, {
          withCredentials: true,
        });
      }
    } catch (error) {
      console.error("Error checking order processing status:", error);
    }
  };

  const handleOrderShipped = async (orderId) => {
    try {
      await axiosInstance.put(`/admin/order/${orderId}/set-shipped`, {}, {
        withCredentials: true,
      });
      // Update order status to shipped once all products are shipped
    } catch (error) {
      console.error("Error marking order as shipped:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Order Management</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 rounded shadow mb-4">
            <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
            <p>Status: {order.deliveryStatus}</p>
            {order.items.map((item) => (
              <div key={item.product._id} className="my-2">
                <p>Product: {item.product.name}</p>
                <p>Seller: {item.product.seller.name}</p>
                <p>Status: {item.product.deliveryStatus}</p>
                {item.product.deliveryStatus !== "shipped" && (
                  <button
                    onClick={() => handleSellerAccept(order._id, item.product._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Accept Product
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => handleOrderShipped(order._id)}
              className="bg-green-500 text-white px-6 py-2 rounded mt-4"
            >
              Mark Order as Shipped
            </button>
          </div>
        ))
      )}
    </div>
  );
};
