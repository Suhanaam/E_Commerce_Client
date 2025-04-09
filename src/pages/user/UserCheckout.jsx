import React from "react";
import { useLocation } from "react-router-dom";

export const UserCheckout = () => {
  const location = useLocation();
  const { items } = location.state || { items: [] };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout Summary</h2>
      {items.length === 0 ? (
        <p>No items selected.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item._id} className="border p-4 rounded">
                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
                <p className="font-bold">
                  Subtotal: ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-xl font-semibold">
            Total: ₹{total}
            <button className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};
