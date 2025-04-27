import React from "react";
import ProductCard from "./ProductCard";

function ProductList() {
  return (
    <section class="py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="font-manrope font-bold text-3xl min-[400px]:text-4xl text-black mb-8 max-lg:text-center">
          Sản phẩm mới nhất
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-12 justify-items-center">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </section>
  );
}

export default ProductList;
