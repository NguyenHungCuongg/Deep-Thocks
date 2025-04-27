import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";

function SidebarFilter() {
  const [priceRange, setPriceRange] = useState(0);
  const [sortByDate, setSortByDate] = useState("newest");
  const [categories, setCategories] = useState({
    kit: false,
    keycap: false,
    switch: false,
    others: false,
  });

  const handlePriceChange = (event) => {
    setPriceRange(Number(event.target.value));
  };

  const handleSortByDateChange = (event) => {
    setSortByDate(event.target.value);
  };

  const handleCategoryChange = (name) => (event) => {
    setCategories({ ...categories, [name]: event.target.checked });
  };

  const handleResetFilters = () => {
    setPriceRange(0);
    setSortByDate("newest");
    setCategories({
      kit: false,
      keycap: false,
      switch: false,
      others: false,
    });
  };

  const customCheckboxStyle = {
    color: "#2f2f2f",
    "&.Mui-checked": {
      color: "#c3a07e",
    },
  };

  return (
    <aside className="w-full max-w-xs p-6 bg-white">
      <h3 className="text-2xl font-bold font-title mb-6">Bộ lọc</h3>
      <div className="mb-8">
        <h4 className="font-semibold mb-4 text-gray-700 font-title">Danh mục</h4>
        <ul className="flex flex-col">
          <li>
            <label className="flex items-center gap-2">
              <Checkbox checked={categories.kit} onChange={handleCategoryChange("kit")} sx={customCheckboxStyle} />
              <span>Kit bàn phím</span>
            </label>
          </li>
          <li>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={categories.keycap}
                onChange={handleCategoryChange("keycap")}
                sx={customCheckboxStyle}
              />
              <span>Keycap</span>
            </label>
          </li>
          <li>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={categories.switch}
                onChange={handleCategoryChange("switch")}
                sx={customCheckboxStyle}
              />
              <span>Switch</span>
            </label>
          </li>
          <li>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={categories.others}
                onChange={handleCategoryChange("others")}
                sx={customCheckboxStyle}
              />
              <span>Khác</span>
            </label>
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h4 className="font-semibold mb-4 text-gray-700 font-title">Khoảng giá</h4>
        <div className="flex flex-col">
          <label className="flex items-center gap-2">
            <Radio
              checked={priceRange === 0}
              onChange={handlePriceChange}
              value={0}
              name="price-range"
              sx={customCheckboxStyle}
            />
            <span>Tất cả</span>
          </label>
          <label className="flex items-center gap-2">
            <Radio
              checked={priceRange === 1}
              onChange={handlePriceChange}
              value={1}
              name="price-range"
              sx={customCheckboxStyle}
            />
            <span>Dưới 500.000 VND</span>
          </label>
          <label className="flex items-center gap-2">
            <Radio
              checked={priceRange === 2}
              onChange={handlePriceChange}
              value={2}
              name="price-range"
              sx={customCheckboxStyle}
            />
            <span>500.000 - 1.000.000 VND</span>
          </label>
          <label className="flex items-center gap-2">
            <Radio
              checked={priceRange === 3}
              onChange={handlePriceChange}
              value={3}
              name="price-range"
              sx={customCheckboxStyle}
            />
            <span>Trên 1.000.000 VND</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-4 text-gray-700 font-title">Sắp xếp theo ngày</h4>
        <div className="flex flex-col">
          <label className="flex items-center gap-2">
            <Radio
              checked={sortByDate === "newest"}
              onChange={handleSortByDateChange}
              value="newest"
              name="sort-date"
              sx={customCheckboxStyle}
            />
            <span>Mới nhất</span>
          </label>
          <label className="flex items-center gap-2">
            <Radio
              checked={sortByDate === "oldest"}
              onChange={handleSortByDateChange}
              value="oldest"
              name="sort-date"
              sx={customCheckboxStyle}
            />
            <span>Cũ nhất</span>
          </label>
        </div>
      </div>

      {/* Reset Button */}
      <button
        className="mt-6 w-full bg-[var(--dark-black)] text-white py-2 rounded-lg hover:bg-[var(--light-black)] active:bg-[var(--dark-black)] 
          active:scale-98 transition-all 
          duration-100 
          ease-in-out
          transform
          focus:ring-2 
          focus:ring-[var(--light-black)] 
          focus:ring-opacity-50"
        onClick={handleResetFilters}
      >
        Đặt lại bộ lọc
      </button>
    </aside>
  );
}

export default SidebarFilter;
