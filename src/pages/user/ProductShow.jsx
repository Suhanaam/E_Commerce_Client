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
      setTimeout(() => {
        const allProducts = response?.data?.data || [];
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setIsLoading(false);
      }, 300);
    } catch (error) {
      console.error("Error fetching products:", error);
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

  if (isLoading) return <Skeltons />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Explore Our Products</h1>

      {/* Search Input Section */}
      <div className="mb-8 flex flex-col sm:flex-row items-center gap-4 max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Search by category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full sm:w-1/2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 w-full sm:w-auto"
        >
          Reset
        </button>
      </div>

      {/* Product Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {FilteredProducts.length === 0 ? (
          <p className="text-center col-span-full">No products found</p>
        ) : (
          FilteredProducts.map((product) => (
            <ProductCard2 product={product} key={product?._id} />
          ))
        )}
      </div>
    </div>
  );
};
