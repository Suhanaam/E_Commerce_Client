import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

export const ViewReview = () => {
  const [reviews, setReviews] = useState([]);

  const fetchSellerReviews = async () => {
    try {
      const res = await axiosInstance.get("/review/seller-reviews", {
        withCredentials: true,
      });
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to fetch seller reviews", error);
    }
  };

  useEffect(() => {
    fetchSellerReviews();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reviews for My Products</h2>
      {reviews.length === 0 ? (
        <p>No reviews found for your products.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review._id} className="border p-4 rounded shadow">
              <p className="font-semibold">Product: {review.product?.name}</p>
              <p>User: {review.user?.name || "N/A"} ({review.user?.email})</p>
              <p>Rating: ⭐ {review.rating}/5</p>
              <p>Comment: {review.comment}</p>
              <p className="text-sm text-gray-500">
                Posted on: {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
