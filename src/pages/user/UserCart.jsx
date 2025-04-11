import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

export const UserCart = () => {
  const [cartData, setCartData] = useState(null);
  const { userData } = useSelector((state) => state.user);

  // 🏠 Address state
  const [address, setAddress] = useState({
    street: "",
    city: "",
    pincode: "",
    phone: "",
  });

  // 🛠️ Handle address input change
  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // 🧾 Fetch cart data
  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get("/cart", {
        withCredentials: true,
      });
      console.log("Fetched Cart:", response.data);
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

  // ❌ Remove item from cart
  const handleDelete = async (productId) => {
    try {
      await axiosInstance.delete(`/cart/remove/${productId}`, {
        withCredentials: true,
      });
      await fetchCart(); // Refresh cart
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // 💳 Stripe payment + address save
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

      const session = await axiosInstance.post("/payment/create-checkout-session", {
        products: cartData?.items,
      });

      // Save session and address
      localStorage.setItem("sessionId", session.data.sessionId);
      localStorage.setItem("deliveryAddress", JSON.stringify(address));

      await stripe.redirectToCheckout({
        sessionId: session.data.sessionId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 🛒 If cart is empty
  if (!cartData || cartData.items.length === 0) {
    return <p className="p-4 text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cartData.items.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded shadow hover:shadow-md"
          >
            <img
              src={
                item.product.images?.[0] ||
                "https://picsum.photos/200"
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

      {/* 🚚 Delivery Address Form */}
      <div className="mt-6 space-y-2 max-w-md">
        <h3 className="text-lg font-semibold">Delivery Address</h3>
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={address.street}
          onChange={handleAddressChange}
          className="block w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleAddressChange}
          className="block w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleAddressChange}
          className="block w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={address.phone}
          onChange={handleAddressChange}
          className="block w-full border p-2 rounded"
          required
        />
      </div>

      {/* 💰 Checkout Section */}
      <div className="mt-6 text-xl font-semibold">
        <p>Total Price: ₹{cartData.totalPrice}</p>
        <button
          onClick={makePayment}
          className="ml-4 mt-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
