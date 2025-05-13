import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import ProductView from "./components/ProductView";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div>
      <AuthProvider>
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
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
