import React, { createContext, useContext, useState, useCallback } from "react";

const FilterContext = createContext();

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    priceRange: 0,
    sortByDate: "newest",
    categories: {
      kit: false,
      keycap: false,
      switch: false,
      others: false,
    },
  });

  const updateFilter = useCallback((filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      priceRange: 0,
      sortByDate: "newest",
      categories: {
        kit: false,
        keycap: false,
        switch: false,
        others: false,
      },
    });
  }, []);

  // Hàm lọc sản phẩm dựa trên filters
  const filterProducts = useCallback(
    (products) => {
      let filteredProducts = [...products];

      // Lọc theo danh mục
      const selectedCategories = Object.keys(filters.categories).filter((category) => filters.categories[category]);

      if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter((product) => {
          const productName = product.productName.toLowerCase();
          const productDescription = product.productDescription?.toLowerCase() || "";

          return selectedCategories.some((category) => {
            switch (category) {
              case "kit":
                return (
                  productName.includes("kit") || productName.includes("layout") || productDescription.includes("kit")
                );
              case "keycap":
                return (
                  productName.includes("keycap") ||
                  productName.includes("profile") ||
                  productName.includes("artisan") ||
                  productDescription.includes("keycap")
                );
              case "switch":
                return (
                  productName.includes("switch") ||
                  productName.includes("clacky") ||
                  productName.includes("tactile") ||
                  productName.includes("linear") ||
                  productName.includes("silent") ||
                  productDescription.includes("switch")
                );
              case "others":
                return (
                  !productName.includes("kit") &&
                  !productName.includes("keycap") &&
                  !productName.includes("switch") &&
                  !productName.includes("layout") &&
                  !productName.includes("profile")
                );
              default:
                return false;
            }
          });
        });
      }

      // Lọc theo khoảng giá
      if (filters.priceRange > 0) {
        filteredProducts = filteredProducts.filter((product) => {
          const price = product.salePrice || product.basePrice;
          switch (filters.priceRange) {
            case 1:
              return price < 500000;
            case 2:
              return price >= 500000 && price <= 1000000;
            case 3:
              return price > 1000000;
            default:
              return true;
          }
        });
      }

      // Sắp xếp theo ngày (sử dụng productId để sắp xếp)
      if (filters.sortByDate === "newest") {
        filteredProducts.sort((a, b) => b.productId - a.productId);
      } else if (filters.sortByDate === "oldest") {
        filteredProducts.sort((a, b) => a.productId - b.productId);
      }

      return filteredProducts;
    },
    [filters]
  );

  const value = {
    filters,
    updateFilter,
    resetFilters,
    filterProducts,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};
