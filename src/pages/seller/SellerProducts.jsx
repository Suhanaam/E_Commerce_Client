import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const { isUserAuth, userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (isUserAuth && userData.role === "seller") {
      fetchSellerProducts();
    }
  }, [isUserAuth, userData]);

  const fetchSellerProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3003/api/products/seller", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching seller products:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Brand</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border">
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.brand}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">{product.stock}</td>
                <td className="border px-4 py-2">
                  <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
