import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductList from "../../components/ProductList";
import Pagination from "../../components/Pagination";
import SidebarFilter from "../../components/SidebarFilter";
import { useLocation } from "react-router-dom";
import { FilterProvider, useFilter } from "../../context/FilterContext";

function ProductsContent() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [endpoint, setEndpoint] = useState("/api/products");
  const { categorySlug, parentSlug, childSlug } = useParams();
  const { filterProducts } = useFilter();
  const itemsPerPage = 9;
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  useEffect(() => {
    if (keyword) {
      setLoading(true);
      axios
        .get(`${backendURL}/api/products/search?keyword=${keyword}`)
        .then((response) => {
          setProducts(response.data || []);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [keyword, backendURL]);

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
    setLoading(true);
    const url = backendURL + endpoint;
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint, backendURL]);

  // Áp dụng filter cho products với useMemo để tối ưu performance
  const filteredProducts = useMemo(() => {
    return filterProducts(products);
  }, [products, filterProducts]);

  const lastPageIndex = currentPage * itemsPerPage;
  const firstPageIndex = lastPageIndex - itemsPerPage;
  const currentProductListPage = filteredProducts.slice(firstPageIndex, lastPageIndex);

  // Reset current page khi filter thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts.length]);

  return (
    <div className="flex flex-col px-[10%] py-8">
      <div className="flex md:flex-row flex-col gap-8">
        <div className="md:w-[20%] w-full">
          <SidebarFilter />
        </div>
        <div className="md:w-[80%] w-full flex flex-col gap-6 justify-start">
          <ProductList
            currentProductListPage={currentProductListPage}
            totalFilteredProducts={filteredProducts.length}
            loading={loading}
          />
          <div className="flex justify-center">
            <Pagination
              totalItems={filteredProducts.length}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Products() {
  return (
    <FilterProvider>
      <ProductsContent />
    </FilterProvider>
  );
}

export default Products;
