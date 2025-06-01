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
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast"; // Thông báo cho người dùng khi có sự kiện xảy ra

function App() {
  return (
    <div>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductView />} />
          {/*Sử dụng dấu ":" để tạo các tham số động -> về sau sẽ truy xuất các tham số này bằng useParams()*/}
          {/*Hiển thị sản phẩm theo 1 level category*/}
          <Route path="/categories/:categorySlug/products" element={<Products />} />
          {/*Hiển thị sản phẩm theo 2 level category (parent → child)*/}
          <Route path="/categories/:parentSlug/:childSlug/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
