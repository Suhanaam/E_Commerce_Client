import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance"; 

export const SellerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isUserAuth, userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/seller/profile",{
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        setProfile(response.data.data);
      } catch (err) {
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    
    if (isUserAuth && userData?.role === "seller") {
      fetchProfile();
    }
  }, [isUserAuth, userData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-5">
      <h2 className="text-2xl font-semibold mb-4">Seller Profile</h2>
      {profile && (
        <div>
          <img
            src={profile.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Mobile:</strong> {profile.mobile}</p>
          <button 
            onClick={() => navigate("/seller/updateprofile", { replace: true })} 
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Profile
          </button>
        </div>
      )}
    </div>
  );
};
