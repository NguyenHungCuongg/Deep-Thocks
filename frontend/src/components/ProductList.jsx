import React from "react";
import ProductCard from "./ProductCard";

function ProductList(props) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col">
        <h2 className="font-manrope font-bold text-3xl min-[400px]:text-4xl text-black mb-8 max-lg:text-center">
          Sản phẩm mới nhất
        </h2>
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {props.currentProductListPage && props.currentProductListPage.length > 0 ? (
            props.currentProductListPage.map((product) => <ProductCard key={product.productId} product={product} />)
          ) : (
            <div className="flex justify-center items-center h-64 w-full text-gray-500">Không có sản phẩm nào</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
