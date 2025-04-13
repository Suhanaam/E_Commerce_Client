import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";

export const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const { userData } = useSelector((state) => state.user);

  const [reviewProductId, setReviewProductId] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleReviewSubmit = async (productId) => {
    try {
      await axiosInstance.post(
        "/reviews",
        { product: productId, rating, comment },
        { withCredentials: true }
      );
      alert("Review submitted!");
      setReviewProductId(null);
      setRating(5);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review");
    }
  };

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
            {/* ... Order details code ... */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col border rounded p-2 gap-2"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product?.images || "/placeholder.png"}
                      alt={item.product?.name || "Product"}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">
                        {item.product?.name || "Product removed"}
                      </p>
                      <p>Qty: {item.quantity}</p>
                      <p>Price: ₹{item.price}</p>
                    </div>
                  </div>

                  {order.deliveryStatus === "Delivered" && (
                    <div className="mt-2">
                      {reviewProductId === item.product._id ? (
                        <div className="space-y-2">
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="border p-1 w-full"
                            placeholder="Rating (1-5)"
                          />
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="border p-1 w-full"
                            placeholder="Write your review"
                          ></textarea>
                          <button
                            onClick={() => handleReviewSubmit(item.product._id)}
                            className="bg-blue-600 text-white px-3 py-1 rounded"
                          >
                            Submit Review
                          </button>
                          <button
                            onClick={() => setReviewProductId(null)}
                            className="text-sm text-gray-500 ml-2"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setReviewProductId(item.product._id)}
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Add Review
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
