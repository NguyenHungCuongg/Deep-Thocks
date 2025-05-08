import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import SidebarFilter from "../components/SidebarFilter";

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of items per page
  const backendURL = "http://localhost:8080";

  useEffect(() => {
    axios
      .get(backendURL + "/api/products")
      .then((response) => {
        setProducts(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

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
