import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance"; 
export const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        
        const response = await axiosInstance.get("/admin/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        
        setAdmin(response.data.data);
      } catch (error) {
        console.error("Error fetching admin profile", error);
      }
    };
    fetchAdminProfile();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
      {admin ? (
        <div>
          <p><strong>Name:</strong> {admin.name}</p>
          <p><strong>Email:</strong> {admin.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};
