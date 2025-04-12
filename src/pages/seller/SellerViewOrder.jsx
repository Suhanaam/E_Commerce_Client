import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

export const SellerViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/seller/orders", {
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

  const handleAcceptOrder = async (orderId, productId) => {
    try {
      await axiosInstance.put(`/seller/order/${orderId}/product/${productId}/accept`, {}, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleShipProduct = async (orderId, productId) => {
    try {
      await axiosInstance.put(`/seller/order/${orderId}/product/${productId}/ship`, {}, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error shipping product:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Seller Order Management</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 rounded shadow mb-4">
            <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
            {order.items.map((item) => (
              <div key={item.product._id} className="my-2">
                <p>Product: {item.product.name}</p>
                <p>Status: {item.product.deliveryStatus}</p>
                {item.product.deliveryStatus === "pending" && (
                  <button
                    onClick={() => handleAcceptOrder(order._id, item.product._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Accept Product
                  </button>
                )}
                {item.product.deliveryStatus === "processing" && (
                  <button
                    onClick={() => handleShipProduct(order._id, item.product._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Mark as Shipped
                  </button>
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};
