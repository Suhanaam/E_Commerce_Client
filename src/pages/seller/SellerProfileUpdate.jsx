import React from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SellerProfileUpdate = () => {
    const [profile, setProfile] = useState({ name: "", email: "", mobile: "", profilePic: "" });
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const { data } = await axios.get("/seller/profile");
          setProfile(data.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      fetchProfile();
    }, []);
  
    const handleChange = (e) => {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    };
  
    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("name", profile.name);
        formData.append("email", profile.email);
        formData.append("mobile", profile.mobile);
        if (image) formData.append("profilePic", image);
  
        await axios.put("/seller/profile/update", formData, { headers: { "Content-Type": "multipart/form-data" } });
        alert("Profile updated successfully!");
        navigate("/seller/profile");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      }
    };
  
    return (
      <div className="container mx-auto p-5">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md">
          <label className="block mb-2">Name:</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
  
          <label className="block mb-2">Email:</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
  
          <label className="block mb-2">Mobile:</label>
          <input type="text" name="mobile" value={profile.mobile} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
  
          <label className="block mb-2">Profile Picture:</label>
          <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded mb-2" />
  
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-3">Save Changes</button>
        </form>
      </div>
    );
  };
