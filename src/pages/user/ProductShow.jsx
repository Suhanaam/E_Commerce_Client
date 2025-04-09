import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

import { Skeltons } from "../../components/user/Skeltons";
import { ProductCard2 } from "../../components/user/ProductCard2";

export const ProductShow = () => {
  const [Products, setProducts] = useState([]);
  const [FilteredProducts, setFilteredProducts] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance({ method: "GET", url: "/products/all" });
      console.log("API Response Data:", response?.data);
      setTimeout(() => {
        const allProducts = response?.data?.data || [];
        setProducts(allProducts);
        setFilteredProducts(allProducts);
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

  const handleSearch = () => {
    const filtered = Products.filter((product) =>
      product.category.toLowerCase().includes(searchCategory.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleReset = () => {
    setFilteredProducts(Products);
    setSearchCategory("");
  };

  if (isLoading) {
    return <Skeltons />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search by category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/3"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FilteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          FilteredProducts.map((value) => (
            <ProductCard2 product={value} key={value?._id} />
          ))
        )}
      </div>
    </div>
  );
};
