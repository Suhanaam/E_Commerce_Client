import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser, saveUser } from "../../redux/features/userSlice";
import toast from "react-hot-toast";


export const SellerLogin = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            
              
             const response = await axiosInstance.post("/seller/login", data);
            console.log("login response:",response?.data?.data);
            localStorage.setItem("token", response.data.token);

            dispatch(saveUser(response?.data?.data));
            toast.success("Login success");
            navigate("/seller/dashboard");
        } catch (error) {
            dispatch(clearUser());
            toast.error(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Seller Login</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" {...register("email")} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input type="password" {...register("password")} className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};