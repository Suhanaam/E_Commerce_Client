import React from "react";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // ✅ Correct way to use Navigate
  

  if (!product) return null; // Ensure product exists before rendering

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
     
     <figure>
        <img
          src={product.images|| "https://via.placeholder.com/150"}
          alt={product.name || "Product Image"}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name || "Product Name"}</h2>
        <p>{product.description || "No description available."}</p>
        <p><strong>Price:</strong> ${product.price || "N/A"}</p>
        <p><strong>ID:</strong> {product?._id || "N/A"}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/productList/${product?._id}`)} // ✅ Correct way
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
};
