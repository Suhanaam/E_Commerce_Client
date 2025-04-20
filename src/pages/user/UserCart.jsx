import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import Lottie from "lottie-react";


export const UserCart = () => {
  const [cartData, setCartData] = useState(null);
  const { userData } = useSelector((state) => state.user);
  const [address, setAddress] = useState({
    name: "",
    address: "",
    phone: "",
    pincode: "",
  });

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

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const isAddressValid = () => {
    return (
      address.name.trim() &&
      address.address.trim() &&
      address.phone.trim() &&
      address.pincode.trim()
    );
  };

  const makePayment = async () => {
    if (!isAddressValid()) {
      alert("Please fill all address fields before checkout.");
      return;
    }

    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);
      const session = await axiosInstance.post(
        "/payment/create-checkout-session",
        {
          products: cartData?.items,
          address,
        },
        { withCredentials: true }
      );

      localStorage.setItem("sessionId", session.data.sessionId);
      localStorage.setItem("deliveryAddress", JSON.stringify(address));

      await stripe.redirectToCheckout({ sessionId: session.data.sessionId });
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        
        <h2 className="text-xl font-semibold text-gray-600 mt-4">Your cart is empty</h2>
        
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">🛒 My Cart</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cartData.items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
          >
            <img
              src={item.product.images?.[0] || "https://picsum.photos/200"}
              alt={item.product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.product.name}
              </h3>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-sm text-gray-600">Unit Price: ₹{item.price}</p>
              <p className="text-green-700 font-semibold mt-1">
                Subtotal: ₹{item.price * item.quantity}
              </p>
              <button
                onClick={() => handleDelete(item.product._id)}
                className="mt-3 inline-block bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white shadow rounded-lg p-6 max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">🚚 Delivery Address</h3>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={address.name}
            onChange={handleAddressChange}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={address.phone}
            onChange={handleAddressChange}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Street Address + City"
            value={address.address}
            onChange={handleAddressChange}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={address.pincode}
            onChange={handleAddressChange}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xl font-semibold text-gray-700">
            🧾 Total: ₹{cartData.totalPrice}
          </p>
          <button
            onClick={makePayment}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
