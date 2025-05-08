import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import SidebarFilter from "../components/SidebarFilter";

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [endpoint, setEndpoint] = useState("/api/products");
  const { categorySlug, parentSlug, childSlug } = useParams(); //Truy xuất cá tham số động từ URL bên phía App.jsx
  const itemsPerPage = 9;
  const backendURL = "http://localhost:8080";

  useEffect(() => {
    if (parentSlug && childSlug) {
      setEndpoint(`/api/categories/${parentSlug}/${childSlug}/products`);
    } else if (categorySlug) {
      setEndpoint(`/api/categories/${categorySlug}/products`);
    } else {
      setEndpoint("/api/products");
    }
  }, [categorySlug, parentSlug, childSlug]);

  useEffect(() => {
    const url = backendURL + endpoint;
    console.log("Fetching products from:", url); // Log the URL for debugging
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [endpoint]);

  const lastPageIndex = currentPage * itemsPerPage;
  const firstPageIndex = lastPageIndex - itemsPerPage;
  const currentProductListPage = products.slice(firstPageIndex, lastPageIndex);

  return (
    <div className="flex flex-col px-[10%] py-8">
      <div className="flex md:flex-row flex-col gap-8">
        <div className="md:w-[20%] w-full">
          <SidebarFilter />
        </div>
        <div className="md:w-[80%] w-full flex flex-col gap-6 justify-center">
          <ProductList currentProductListPage={currentProductListPage} />
          <div className="flex justify-center">
            <Pagination totalItems={products.length} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
