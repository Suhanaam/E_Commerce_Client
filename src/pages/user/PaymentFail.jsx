import React from "react";
import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

export const PaymentFail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4 text-red-500">
          <XCircle className="w-20 h-20" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          Oops! Something went wrong with your payment. Please try again or contact support.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row justify-center">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            Back to Home
          </Link>
          <Link
            to="/user/cart"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
};
