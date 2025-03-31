import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

export const SignupPage = ({ role = "user" }) => {
    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState(null);

    const onSubmit = async (data) => {
        try {
            if (data.password !== data.confirmPassword) {
                setError("confirmPassword", { type: "manual", message: "Passwords do not match" });
                return;
            }

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("confirmPassword", data.confirmPassword);
            formData.append("mobile", data.mobile);
            if (profilePic) {
                formData.append("Userimage", profilePic);
            }

            const response = await axiosInstance.post("/user/signup", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log("Signup response:", response);
            navigate("/login");
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Signup now!</h1>
                    <p className="py-6">
                        Join us today! Create your account to explore amazing features.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Username</span></label>
                            <input type="text" placeholder="Enter name" {...register("name", { required: "Name is required" })} className="input input-bordered" />
                            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" placeholder="Enter email" {...register("email", { required: "Email is required" })} className="input input-bordered" />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Mobile</span></label>
                            <input type="tel" placeholder="Enter mobile number" {...register("mobile", { required: "Mobile number is required" })} className="input input-bordered" />
                            {errors.mobile && <span className="text-red-500">{errors.mobile.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input type="password" placeholder="Enter password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} className="input input-bordered" />
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Confirm Password</span></label>
                            <input type="password" placeholder="Confirm password" {...register("confirmPassword", { required: "Confirm Password is required" })} className="input input-bordered" />
                            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Profile Picture (Optional)</span></label>
                            <input type="file" accept="image/*" onChange={(e) => setProfilePic(e.target.files[0])} className="input input-bordered" />
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                        <div className="text-center mt-3">
                            <Link to="/login" className="text-blue-500">Already have an account? Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
