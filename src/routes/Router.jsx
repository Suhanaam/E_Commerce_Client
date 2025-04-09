import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/user/Home";
import { About } from "../pages/user/About";
import { Contact } from "../pages/user/Contact";
import { RootLayout } from "../layout/RootLayout";
import { Profile } from "../pages/user/Profile";
import { ProtectRoutes } from "./ProtectRoutes";
import { ErrorPage } from "../pages/shared/ErrorPage";
import { Products } from "../pages/user/Products";
import { ProductList } from "../pages/user/ProductList";
import { LoginPage } from "../pages/shared/LoginPage";
import { SignupPage } from "../pages/shared/SignupPage";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { SellerLayout } from "../layout/SellerLayout";
import { AdminLayout } from "../layout/AdminLayout";
import { SellerDashboard } from "../pages/seller/SellerDashboard";
import SellerProtectRoutes from "./SellerProtectRoutes";
import AdminProtectRoutes from "./AdminProtectRoutes";
import { UserDashboard } from "../pages/user/UserDashboard";
import { SellerLogin } from "../pages/seller/SellerLogin";
import { AdminLogin } from "../pages/admin/AdminLogin";
import { SellerProfile } from "../pages/seller/SellerProfile";
import { SellerProducts } from "../pages/seller/SellerProducts";
import { ProductCreate } from "../pages/seller/ProductCreate";
import { ViewOrder } from "../pages/seller/ViewOrder";
import { ViewReview } from "../pages/seller/ViewReview";
import { UserLayout } from "../layout/UserLayout";
import { SellerProfileUpdate } from "../pages/seller/SellerProfileUpdate";
import { AdminCreateSellers } from "../pages/admin/AdminCreateSellers";
import { AdminViewSellers } from "../pages/admin/AdminViewSellers";
import { AdminViewUsers } from "../pages/admin/AdminViewUsers";
import { AdminViewOrders } from "../pages/admin/AdminViewOrders";
import { AdminViewProducts } from "../pages/admin/AdminViewProducts";
import { AdminChangePassword } from "../pages/admin/AdminChangePassword";
import { AdminRegister } from "../pages/admin/AdminRegister";
import { AdminProfile } from "../pages/admin/AdminProfile";
import { UserCart } from "../pages/user/UserCart";
import { UserWishlist } from "../pages/user/UserWishlist";
import { ProductShow } from "../pages/user/ProductShow";
import { ProductList2 } from "../pages/user/ProductList2";
import { UserCheckout } from "../pages/user/UserCheckout";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/products", element: <Products /> },
      { path: "/productList/:id", element: <ProductList /> },
      { path: "/admin/login", element: <AdminLogin /> },
      { path: "/seller/login", element: <SellerLogin /> },

      // User-specific protected routes
      
    ],
  },
  {
        
    path: "user",
    element:<UserLayout />,
    children: [
      {
      path:"",
      element: <ProtectRoutes />,
      children:[
      { path: "dashboard", element: <UserDashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "cart", element: <UserCart /> },
      { path: "payment", element: <Contact /> },
      { path: "wishlist", element: <UserWishlist /> },
      { path: "allproducts", element: <ProductShow /> },
      { path: "productList2/:id", element: <ProductList2 /> },
      { path: "checkout", element: <UserCheckout /> }
      

      ]
    }
    ],
  },

  // ✅ Seller Routes (Protected)
  {
    path: "seller",
    element: <SellerLayout />, // ✅ Seller layout wraps all child routes
    errorElement: <ErrorPage role="seller" />,
    children: [
      {
        path: "", // ✅ Explicitly define the path for `SellerProtectRoutes`
        element: <SellerProtectRoutes />,
        children: [
          { path: "dashboard", element: <SellerDashboard /> },
          { path: "myproducts", element: <SellerProducts /> },
          { path: "profile", element: <SellerProfile /> },
          { path: "createProduct", element: <ProductCreate /> },
          { path: "orders", element: <ViewOrder /> },
          { path: "reviews", element: <ViewReview /> },
          { path: "updateprofile", element: <SellerProfileUpdate /> },
        ],
      },
    ],
  },

  // ✅ Admin Routes (Protected)
  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage role="admin" />,
    children: [
      {
        path: "", // ✅ Explicitly define path for `AdminProtectRoutes`
        element: <AdminProtectRoutes />,
        children: [{ path: "dashboard", element: <AdminDashboard /> },
          { path: "createSeller", element: <AdminCreateSellers/>},
          { path: "sellers", element: <AdminViewSellers />},
          { path: "users", element: <AdminViewUsers />},
          { path: "orders", element: <AdminViewOrders />},
          { path: "products", element: <AdminViewProducts />},
          { path: "changePassword", element: <AdminChangePassword />},
          { path: "register", element: <AdminRegister />},
          { path: "profile", element: <AdminProfile />},

        ],
      },
    ],
  },
]);
