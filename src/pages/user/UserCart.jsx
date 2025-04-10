import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

export const UserCart = () => {
  const [cartData, setCartData] = useState(null);
  const { userData } = useSelector((state) => state.user);

  // Define fetchCart globally inside the component
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

  // Delete Item – use the product ID (item.product) from the cart item
  const handleDelete = async (productId) => {
    try {
      console.log(productId);
      await axiosInstance.delete(`/cart/remove/${productId}`, {
        withCredentials: true,
      });
      await fetchCart(); // Refresh cart after deletion
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    // Add your checkout functionality here, e.g., navigating to the checkout page
  };

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
                "https://picsum.photos/200" // Reliable fallback placeholder
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
              onClick={() => handleDelete(item.product)} // Pass product ID
              className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 text-xl font-semibold">
        <p>Total Price: ₹{cartData.totalPrice}</p>
        <button
          onClick={handleCheckout}
          className="ml-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
