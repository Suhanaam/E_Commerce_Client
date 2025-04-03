import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance"; 
export const AdminViewProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const response = await axiosInstance.get("/admin/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id} className="border p-2 my-2">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};
