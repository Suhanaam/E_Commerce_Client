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

  const addReview = async ( productId, orderId) => {
    
  const rating = prompt("Enter rating (1-5):");
  const comment = prompt("Enter your review:");

  if (!rating || !comment) {
    alert("Both rating and comment are required!");
    return;
  }

  try {
    axiosInstance.post("/review/add", {
      product: productId, // rename here
      orderId,
      rating: Number(rating),
      comment,
    },{ withCredentials: true });
    
    alert("Review submitted successfully!");
  } catch (error) {
    console.error("Failed to create review", error);
    alert("Failed to submit review.");
  }
};


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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center border rounded p-2 gap-4"
                  >
                    <img
                      src={item.product?.images || "/placeholder.png"}
                      alt={item.product?.name || "Product"}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{item.product?.name || "Product removed"}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>Price: ₹{item.price}</p>
                    </div>
                    <div>
                     
                    { order.deliveryStatus === "Delivered" ? (
                        <button
                        onClick={() => addReview(item.product._id, order._id)}
                             className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
                         >
                        Add Review
                          </button>
                      ) : null}


                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
