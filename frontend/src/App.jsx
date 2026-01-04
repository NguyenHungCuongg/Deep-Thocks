import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/customer/Home";
import Footer from "./components/Footer";
import Login from "./pages/customer/Login";
import Register from "./pages/customer/Register";
import About from "./pages/customer/About";
import Contact from "./pages/customer/Contact";
import Cart from "./pages/customer/Cart";
import Products from "./pages/customer/Products";
import Payment from "./pages/customer/Payment";
import ProductView from "./components/ProductView";
import Profile from "./pages/customer/Profile";
import Dashboard from "./pages/admin/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import BillManagementForm from "./pages/admin/BillManagementForm";
import UserManagementForm from "./pages/admin/UserManagementForm";
import SaleManagementForm from "./pages/admin/SaleManagementForm";
import ProductManagementForm from "./pages/admin/ProductManagementForm";
import IncomeManagementForm from "./pages/admin/IncomeManagementForm";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import AdminRoute from "./context/AdminRoute";
import OAuth2Redirect from "./pages/customer/OAuth2Redirect";
import VnpayRedirect from "./pages/customer/VnpayRedirect";

function App() {
  const authState = useContext(AuthContext);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Customer Routes */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductView />} />
                <Route path="/categories/:categorySlug/products" element={<Products />} />
                <Route path="/categories/:parentSlug/:childSlug/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/account/login" element={<Login />} />
                <Route path="/account/register" element={<Register />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
                <Route path="/payment/vnpay-return" element={<VnpayRedirect />} />
              </Routes>
              <Footer />
            </>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductManagementForm />} />
          <Route path="orders" element={<BillManagementForm />} />
          <Route path="users" element={<UserManagementForm />} />
          <Route path="revenue" element={<IncomeManagementForm />} />
          <Route path="expenses" element={<SaleManagementForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
