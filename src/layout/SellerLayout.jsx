import { Outlet } from "react-router-dom";
import { Footer } from "../components/user/Footer";
import { SellerHeaderr } from "../components/seller/SellerHeaderr";

export const SellerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SellerHeaderr />
      
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 max-w-7xl mx-auto">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};
