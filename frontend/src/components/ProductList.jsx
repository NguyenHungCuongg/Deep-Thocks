import React from "react";
import ProductCard from "./ProductCard";

function ProductList(props) {
  const totalProducts = props.totalFilteredProducts || 0;
  const currentPageCount = props.currentProductListPage?.length || 0;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col">
        <div className="flex justify-between items-center mb-8 max-lg:flex-col max-lg:gap-4">
          <h2 className="font-manrope font-bold text-3xl min-[400px]:text-4xl text-black max-lg:text-center">
            Sản phẩm mới nhất
          </h2>
          {totalProducts > 0 && (
            <div className="text-gray-600 text-sm bg-gray-100 px-4 py-2 rounded-lg">
              Hiển thị <span className="font-semibold">{currentPageCount}</span> trong tổng số{" "}
              <span className="font-semibold">{totalProducts}</span> sản phẩm
            </div>
          )}
        </div>
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {props.currentProductListPage && props.currentProductListPage.length > 0 ? (
            props.currentProductListPage.map((product, index) => <ProductCard key={index} product={product} />)
          ) : (
            <div className="flex flex-col justify-center items-center h-64 w-full text-gray-500 col-span-full">
              <div className="text-6xl mb-4">🔍</div>
              <div className="text-lg font-medium">Không tìm thấy sản phẩm nào</div>
              <div className="text-sm">Vui lòng thử điều chỉnh bộ lọc hoặc tìm kiếm khác</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
