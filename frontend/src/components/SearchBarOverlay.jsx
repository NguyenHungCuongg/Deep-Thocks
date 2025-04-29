import React, { useEffect } from "react";

function SearchBarOverlay(props) {
  // Đóng overlay khi nhấn phím ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") props.onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [props.onClose]);

  if (!props.isOpen) return null; // Nếu không mở thì không render gì cả

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
      >
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 ps-10 text-sm text-[var(--grey)] border border-[var(--primary-color)] border-2 rounded-lg bg-[var(--light-black)]"
            placeholder="Tìm kiếm sản phẩm..."
            required
          />
          <button
            type="submit"
            class="text-[var(--dark-white)] absolute end-2.5 bottom-2.5 bg-[var(--primary-color)] hover:bg-[var(--light-primary-color)] font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBarOverlay;
