import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductInformation from "./ProductInformation";
import ProductImageSlider from "./ProductImageSlider";

function ProductView() {
  const { id } = useParams();
  const [productImages, setProductImages] = React.useState([]);
  const [currentProduct, setCurrentProduct] = React.useState({});
  const backendURL = "http://localhost:8080";

  useEffect(() => {
    axios
      .get(backendURL + `/api/products/${id}/images`)
      .then((response) => {
        setProductImages(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching product images:", error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(backendURL + `/api/products/${id}`)
      .then((response) => {
        console.log("Product details:", response.data);
        setCurrentProduct(
          response.data || { salePrice: 0, basePrice: 0, productName: "", productDescription: "", stockQuantity: 0 }
        );
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setCurrentProduct({ salePrice: 0, basePrice: 0, productName: "", productDescription: "", stockQuantity: 0 });
      });
  }, [id]);

  return (
    <div className="md:px-[12%] px-10 py-12 flex flex-col items-center">
      <div className="grid items-start grid-cols-1 lg:grid-cols-5">
        <div className="col-span-3 top-0 gap-0.5">
          <ProductImageSlider slideImages={productImages} />
        </div>
        <div className="col-span-2 py-6 px-8 max-lg:max-w-2xl">
          <ProductInformation currentProduct={currentProduct} />
        </div>
      </div>
    </div>
  );
}

export default ProductView;
