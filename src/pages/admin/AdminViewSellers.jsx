import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance"; 
export const AdminViewSellers = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axiosInstance.get("/admin/sellers");
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching sellers", error);
      }
    };
    fetchSellers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sellers</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Mobile</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <tr key={seller._id} className="text-center">
              <td className="border p-2">{seller.name}</td>
              <td className="border p-2">{seller.email}</td>
              <td className="border p-2">{seller.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
