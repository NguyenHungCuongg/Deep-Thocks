import React from "react";
import ProductInformation from "./ProductInformation";
import ProductImageSlider from "./ProductImageSlider";

function ProductView() {
  return (
    <div className="md:px-[12%] px-10 py-12 flex flex-col items-center">
      <div className="grid items-start grid-cols-1 lg:grid-cols-5">
        <div className="col-span-3 top-0 gap-0.5">
          <ProductImageSlider />
        </div>

        <div className="col-span-2 py-6 px-8 max-lg:max-w-2xl">
          <ProductInformation />
        </div>
      </div>
    </div>
  );
}

export default ProductView;
