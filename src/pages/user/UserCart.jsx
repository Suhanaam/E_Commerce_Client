import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

export const UserCart = () => {
  const [cartData, setCartData] = useState(null); 
  const { userData } = useSelector((state) => state.user);

  // ✅ New state to track selected items
  const [selectedItems, setSelectedItems] = useState([]);

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

  const handleDelete = async (itemId) => {
    try {
      await axiosInstance.delete(`/cart/remove/${itemId}`, {
        withCredentials: true,
      });
      await fetchCart();
      // Remove from selectedItems too if selected
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // ✅ Toggle selection
  const toggleSelect = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // ✅ Checkout only selected items
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to checkout.");
      return;
    }
    const selectedDetails = cartData.items.filter((item) =>
      selectedItems.includes(item._id)
    );
    console.log("Selected Items for checkout:", selectedDetails);
    alert(`Proceeding to checkout with ${selectedItems.length} items.`);
    // Send selectedDetails to server or navigate to payment page
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
            <input
              type="checkbox"
              checked={selectedItems.includes(item._id)}
              onChange={() => toggleSelect(item._id)}
              className="mb-2"
            />
            <img
              src={item.product.images?.[0]}
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
              onClick={() => handleDelete(item._id)}
              className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-xl font-semibold">
        <p className="mb-2">Total Price: ₹{cartData.totalPrice}</p>
        <button
          onClick={handleCheckout}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Checkout Selected ({selectedItems.length})
        </button>
      </div>
    </div>
  );
};
