// AdminViewReviews.jsx
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

export const AdminViewReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get("/review/all", {
          withCredentials: true,
        });
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Product Reviews</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Product</th>
              <th className="px-4 py-2 border">Rating</th>
              <th className="px-4 py-2 border">Comment</th>
              <th className="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td className="px-4 py-2 border">{review.user?.name || "Unknown"}</td>
                <td className="px-4 py-2 border">{review.product?.name || "Deleted Product"}</td>
                <td className="px-4 py-2 border">{review.rating}</td>
                <td className="px-4 py-2 border">{review.comment}</td>
                <td className="px-4 py-2 border">
                  {new Date(review.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
