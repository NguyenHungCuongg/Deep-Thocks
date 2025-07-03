import React, { useMemo } from "react";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import { useFilter } from "../context/FilterContext";

function SidebarFilter() {
  const { filters, updateFilter, resetFilters } = useFilter();

  const handlePriceChange = (event) => {
    updateFilter("priceRange", Number(event.target.value));
  };

  const handleSortByDateChange = (event) => {
    updateFilter("sortByDate", event.target.value);
  };

  const handleCategoryChange = (name) => (event) => {
    updateFilter("categories", {
      ...filters.categories,
      [name]: event.target.checked,
    });
  };

  const handleResetFilters = () => {
    resetFilters();
  };

  // Đếm số filter đang được áp dụng
  const activeFiltersCount = useMemo(() => {
    let count = 0;

    // Đếm categories
    const selectedCategories = Object.values(filters.categories).filter(Boolean).length;
    count += selectedCategories;

    // Đếm price range
    if (filters.priceRange > 0) count += 1;

    // Đếm sort (không tính "newest" vì đó là default)
    if (filters.sortByDate !== "newest") count += 1;

    return count;
  }, [filters]);

  const customCheckboxStyle = {
    color: "#2f2f2f",
    "&.Mui-checked": {
      color: "#c3a07e",
    },
  };

  return (
    <aside className="w-full max-w-xs p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold font-title">Bộ lọc</h3>
        {activeFiltersCount > 0 && (
          <span className="bg-[#c3a07e] text-white text-xs px-2 py-1 rounded-full">{activeFiltersCount}</span>
        )}
      </div>
      <div className="mb-8">
        <h4 className="font-semibold mb-4 text-gray-700 font-title">Danh mục</h4>
        <ul className="flex flex-col">
          <li>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={filters.categories.kit}
                onChange={handleCategoryChange("kit")}
                sx={customCheckboxStyle}
              />
              <span>Kit bàn phím</span>
            </label>
          </li>
          <li>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={filters.categories.keycap}
                onChange={handleCategoryChange("keycap")}
                sx={customCheckboxStyle}
              />
              <span>Keycap</span>
            </label>
          </li>
          <li>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={filters.categories.switch}
                onChange={handleCategoryChange("switch")}
                sx={customCheckboxStyle}
              />
              <span>Switch</span>
            </label>
          </li>
          <li>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={filters.categories.others}
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
              checked={filters.priceRange === 0}
              onChange={handlePriceChange}
              value={0}
              name="price-range"
              sx={customCheckboxStyle}
            />
            <span>Tất cả</span>
          </label>
          <label className="flex items-center gap-2">
            <Radio
              checked={filters.priceRange === 1}
              onChange={handlePriceChange}
              value={1}
              name="price-range"
              sx={customCheckboxStyle}
            />
            <span>Dưới 500.000 VND</span>
          </label>
          <label className="flex items-center gap-2">
            <Radio
              checked={filters.priceRange === 2}
              onChange={handlePriceChange}
              value={2}
              name="price-range"
              sx={customCheckboxStyle}
            />
            <span>500.000 - 1.000.000 VND</span>
          </label>
          <label className="flex items-center gap-2">
            <Radio
              checked={filters.priceRange === 3}
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
              checked={filters.sortByDate === "newest"}
              onChange={handleSortByDateChange}
              value="newest"
              name="sort-date"
              sx={customCheckboxStyle}
            />
            <span>Mới nhất</span>
          </label>
          <label className="flex items-center gap-2">
            <Radio
              checked={filters.sortByDate === "oldest"}
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
        className={`mt-6 w-full py-2 rounded-lg transition-all duration-100 ease-in-out transform focus:ring-2 focus:ring-opacity-50 ${
          activeFiltersCount > 0
            ? "bg-[#2f2f2f] text-white hover:bg-[#444] active:bg-[#2f2f2f] active:scale-98 focus:ring-[#444]"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        onClick={handleResetFilters}
        disabled={activeFiltersCount === 0}
      >
        Đặt lại bộ lọc {activeFiltersCount > 0 && `(${activeFiltersCount})`}
      </button>
    </aside>
  );
}

export default SidebarFilter;
