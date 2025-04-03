import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance"; 

export const ProductCreate = () => {
    const { register, handleSubmit, reset } = useForm();
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("brand", data.brand);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("stock", data.stock);
            formData.append("category", data.category);
            formData.append("image", image); // Image file

            const response = await axiosInstance.post("/products/create", formData,{
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                withCredentials: true,
              });




            console.log("Product Created:", response.data);
            reset();
            navigate("/seller/myproducts");// Redirect to product list
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Create Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Name</label>
                    <input {...register("name")} className="w-full border p-2 rounded" required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Brand</label>
                    <input {...register("brand")} className="w-full border p-2 rounded" required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Description</label>
                    <textarea {...register("description")} className="w-full border p-2 rounded" required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Price</label>
                    <input type="number" {...register("price")} className="w-full border p-2 rounded" required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Stock</label>
                    <input type="number" {...register("stock")} className="w-full border p-2 rounded" required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Category</label>
                    <input {...register("category")} className="w-full border p-2 rounded" required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Image</label>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full border p-2 rounded" required />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">Create Product</button>
            </form>
        </div>
    );
};
