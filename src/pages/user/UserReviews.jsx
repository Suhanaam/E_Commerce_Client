import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editData, setEditData] = useState({ rating: 5, comment: "" });

  const fetchUserReviews = async () => {
    try {
      const res = await axiosInstance.get("/review/my-reviews", {
        withCredentials: true,
      });
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to fetch user reviews", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await axiosInstance.delete(`/review/delete/${id}`, {
        withCredentials: true,
      });
      fetchUserReviews(); // Refresh
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  const handleEdit = (review) => {
    setEditingReviewId(review._id);
    setEditData({ rating: review.rating, comment: review.comment });
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(
        `/review/update/${editingReviewId}`,
        editData,
        { withCredentials: true }
      );
      setEditingReviewId(null);
      fetchUserReviews(); // Refresh
    } catch (error) {
      console.error("Failed to update review", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditData({ rating: 5, comment: "" });
  };

  useEffect(() => {
    fetchUserReviews();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review._id} className="border p-4 rounded shadow">
              <p className="font-semibold">Product: {review.product?.name}</p>

              {editingReviewId === review._id ? (
                <div className="space-y-2">
                  <label>
                    Rating:
                    <input
                      type="number"
                      value={editData.rating}
                      onChange={(e) =>
                        setEditData({ ...editData, rating: e.target.value })
                      }
                      className="ml-2 border px-2 py-1 w-16"
                      min={1}
                      max={5}
                    />
                  </label>
                  <br />
                  <label>
                    Comment:
                    <textarea
                      value={editData.comment}
                      onChange={(e) =>
                        setEditData({ ...editData, comment: e.target.value })
                      }
                      className="w-full border px-2 py-1"
                    />
                  </label>
                  <br />
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <p>Rating: ⭐ {review.rating}/5</p>
                  <p>Comment: {review.comment}</p>
                  <p className="text-sm text-gray-500">
                    Posted on: {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleEdit(review)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserReviews;
