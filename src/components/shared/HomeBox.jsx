import React from 'react'
import { Link, useNavigate } from "react-router-dom";

export const HomeBox = () => {
    const navigate = useNavigate()
  return (
    <div><div
    className="hero min-h-screen"
    style={{
      backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
    }}>
    <div className="hero-overlay"></div>
    <div className="hero-content text-neutral-content text-center">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
        <p className="mb-5">
          What are you searching for?.........i'd be happy to help you find it
        </p>
        <button className="btn btn-primary" onClick={()=>navigate('/login')}>Get Started</button>
      </div>
    </div>
  </div></div>
  )
}


