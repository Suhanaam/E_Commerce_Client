import { Outlet } from "react-router-dom";
import { Footer } from "../components/user/Footer";
import { SellerHeaderr } from "../components/seller/SellerHeaderr";

export const SellerLayout = () => {
  return (
    <div>
      <SellerHeaderr />
     
      <Outlet /> {/* ✅ Child routes (dashboard, products) will render here */}
      <Footer />
    </div>
  );
};
