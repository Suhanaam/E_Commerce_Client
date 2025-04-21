import React from "react";
import { Link } from "react-router-dom";

export const ProductCard2 = ({ product }) => {
  if (!product) return null;

  return (
    <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <figure className="w-full h-48 overflow-hidden">
        <img
          src={product.images || "https://via.placeholder.com/150"}
          alt={product.name || "Product Image"}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {product.name || "Product Name"}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {product.description || "No description available."}
        </p>
        <p className="text-base font-medium text-gray-900 dark:text-gray-200">
          <strong>Price:</strong> ${product.price || "N/A"}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Brand:</strong> {product?.brand || "N/A"}
        </p>
        <div className="pt-2 text-right">
          <Link
            to={`/user/productList2/${product._id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
