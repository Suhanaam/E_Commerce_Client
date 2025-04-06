import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

export const UserCart = () => {
  const [cartData, setCartData] = useState(null); // null initially
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get("/cart", {
          withCredentials: true,
        });

        console.log("Fetched Cart:", response.data);
        setCartData(response.data.cart); // ✅ Set full cart
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartData(null); // fallback
      }
    };

    if (userData?._id) {
      fetchCart();
    }
  }, [userData]);

  if (!cartData || cartData.items.length === 0) {
    return <p className="p-4 text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="p-4">
      <h1>here is your items</h1>
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cartData.items.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded shadow hover:shadow-md"
          >
            <img
              src={item.product.images?.[0]}
              alt={item.product.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{item.product.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price per unit: ₹{item.price}</p>
            <p>last total</p>
            <p className="font-bold text-green-700">
              Subtotal: ₹{item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-xl font-semibold">
        Total Price: ₹{cartData.totalPrice}
      </div>
    </div>
  );
};
