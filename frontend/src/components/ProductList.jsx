import React from "react";
import ProductCard from "./ProductCard";
import SidebarFilter from "./SidebarFilter";

function ProductList() {
  return (
    <section class="py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="font-manrope font-bold text-3xl min-[400px]:text-4xl text-black mb-8 max-lg:text-center">
          Sản phẩm mới nhất
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <SidebarFilter />

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductList;
