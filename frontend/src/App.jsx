import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Herobanner from "./components/Herobanner";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/products" element={<h1>Products</h1>} />
        <Route path="/cart" element={<h1>Cart</h1>} />
      </Routes>
    </div>
  );
}

export default App;
