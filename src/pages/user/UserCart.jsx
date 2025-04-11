import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

export const UserCart = () => {
  const [cartData, setCartData] = useState(null);
  const [address, setAddress] = useState("");
  const { userData } = useSelector((state) => state.user);

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get("/cart", {
        withCredentials: true,
      });
      setCartData(response.data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartData(null);
    }
  };

  useEffect(() => {
    if (userData?._id) {
      fetchCart();
    }
  }, [userData]);

  const handleDelete = async (productId) => {
    try {
      await axiosInstance.delete(`/cart/remove/${productId}`, {
        withCredentials: true,
      });
      await fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const makePayment = async () => {
    if (!address.trim()) {
      alert("Please enter your delivery address before proceeding.");
      return;
    }

    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);
      const session = await axiosInstance.post(
        "/payment/create-checkout-session",
        {
          products: cartData?.items,
          address: address.trim(),
        },
        { withCredentials: true }
      );

      const result = stripe.redirectToCheckout({
        sessionId: session.data.sessionId,
      });
    } catch (error) {
      console.log("Payment error:", error);
    }
  };

  if (!cartData || cartData.items.length === 0) {
    return <p className="p-4 text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cartData.items.map((item) => (
          <div key={item._id} className="border p-4 rounded shadow">
            <img
              src={
                item.product.images?.[0] || "https://picsum.photos/200"
              }
              alt={item.product.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{item.product.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price per unit: ₹{item.price}</p>
            <p className="font-bold text-green-700">
              Subtotal: ₹{item.price * item.quantity}
            </p>
            <button
              onClick={() => handleDelete(item.product._id)}
              className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Address Input Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Delivery Address</h3>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your full delivery address"
          className="w-full p-3 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
        ></textarea>
      </div>

      <div className="mt-6 text-xl font-semibold">
        <p>Total Price: ₹{cartData.totalPrice}</p>
        <button
          onClick={makePayment}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={!address.trim()}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
