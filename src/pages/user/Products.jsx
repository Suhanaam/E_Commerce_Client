import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { ProductCard } from "../../components/user/ProductCard";
import { Skeltons } from "../../components/user/Skeltons";

export const Products = () => {
  const [Products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/products/all",
      });
      console.log("API Response Data:", response?.data);
      setTimeout(() => {
        setProducts(response?.data?.data || []);
        setIsLoading(false);
      }, 300);
    } catch (error) {
      console.log("Error fetching products:", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return <Skeltons />;
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Product List
      </h1>

      {Products.length === 0 ? (
        <p className="text-center text-gray-600">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Products.map((value) => (
            <ProductCard product={value} key={value?._id} />
          ))}
        </div>
      )}
    </div>
  );
};
