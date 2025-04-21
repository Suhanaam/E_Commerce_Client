import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";  // Ensure you have axiosInstance set up

export const AdminCreateSellers = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    profilePic: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  //submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
  
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("confirmPassword", formData.confirmPassword);
      data.append("mobile", formData.mobile);
      if (formData.profilePic) {
        data.append("Sellerimage", formData.profilePic); // matches multer field name in router
      }
  
      const response = await axiosInstance.post("/seller/signup", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
  
      console.log("Seller Registered:", response.data);
      setMessage("Seller created successfully!");
      setTimeout(() => navigate("/admin/sellers"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error creating seller");
    } finally {
      setLoading(false);
    }
  };
  

  // Handle form submit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setMessage("");
  //   setError("");

  //   try {
  //     const data = new FormData();
  //     data.append("name", formData.name);
  //     data.append("email", formData.email);
  //     data.append("password", formData.password);
  //     data.append("confirmPassword", formData.confirmPassword);
  //     data.append("mobile", formData.mobile);
  //     if (formData.profilePic) {
  //       data.append("Sellerimage", formData.profilePic);
  //     }

      
  //     axiosInstance.post("/seller/signup", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       withCredentials: true,
  //     })
  //       .then((res) => console.log("Seller Registered:", res.data))
  //       .catch((err) => console.error("Registration Failed:", err.response));
      

  //     // const response = await axiosInstance.post("seller/signup", data, {
  //     //   headers: { "Content-Type": "multipart/form-data" },
  //     //   withCredentials: true,
  //     // });

  //     // setMessage("Seller created successfully!");
  //     setTimeout(() => navigate("/admin/sellers"), 2000); // Redirect after success
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Error creating seller");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-5">
      <h2 className="text-2xl font-semibold mb-4">Create Seller</h2>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="file"
          name="profilePic"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Seller"}
        </button>
      </form>
    </div>
  );
};
