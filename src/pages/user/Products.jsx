import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { ProductCard } from "../../components/user/ProductCard";
import { Skeltons } from "../../components/user/Skeltons";

export const Products = () => {
  const [Products, setProducts] = useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [error,setError]=useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance({ method :"GET",url:"/products/all"});
      console.log("API Response Data:", response?.data);
      setTimeout(()=>{
        setProducts(response?.data?.data || []); // Ensure it's an array
        setIsLoading(false);

      },300);
      
    } catch (error) {
      console.log("Error fetching products:", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  if(isLoading){
    return <Skeltons />
  }

  return (
    <div>
      <h1>Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
      {Products.length === 0 ? (
        <p>No products found</p>
      ) : (
        Products.map((value) => (
          <ProductCard product={value} key={value?._id} />
        ))
      )}
    </div>
    </div>
  );
};
