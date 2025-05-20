import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchBarOverlay(props) {
  const [keyword, setKeyword] = React.useState("");
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // Đóng overlay khi nhấn phím ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") props.onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [props.onClose]);

  if (!props.isOpen) return null; // Nếu không mở thì không render gì cả

  //Xử lý tìm kiếm
  const hanleSearch = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    try {
      const response = await axios.get(backendURL + "/api/products/search?keyword=" + keyword);
      if (response.status === 200) {
        navigate(`/products?keyword=${encodeURIComponent(keyword)}`);
        const data = response.data;
        console.log(data);
        props.onClose();
      } else {
        console.error("Tìm kiếm không thành công");
      }
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
    }
  };

  // Nếu mở thì render overlay search bar
  return (
    <div
      className="fixed inset-0 z-50 transition-opacity flex items-start justify-center pt-32"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={props.onClose} //Nếu click vào overlay(tức ngoài searchbar) thì đóng
    >
      <form
        className="bg-[var(--light-black)] rounded-lg w-full max-w-2xl px-6 py-4 shadow-xl"
        onClick={(e) => e.stopPropagation()} // Ngăn click ra ngoài (đang click vào search bar)
        onSubmit={hanleSearch}
      >
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-[var(--grey)] border-[var(--primary-color)] border-2 rounded-lg bg-[var(--light-black)]"
            placeholder="Tìm kiếm sản phẩm..."
            required
          />
          <button
            type="submit"
            className="text-[var(--dark-white)] absolute end-2.5 bottom-2.5 bg-[var(--primary-color)] hover:bg-[var(--light-primary-color)] font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBarOverlay;
