import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import AddProductDialog from "../../components/AddProductDialog";
import toast from "react-hot-toast";

function ProductManagementForm() {
  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
  const [products, setProducts] = useState([]);
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const itemsPerPage = 6;
  const lastPageIndex = currentPage * itemsPerPage;
  const firstPageIndex = lastPageIndex - itemsPerPage;
  const currentProductListPage = filteredProducts.slice(firstPageIndex, lastPageIndex);

  useEffect(() => {
    axios
      .get(`${backendURL}/api/products`)
      .then((response) => {
        setProducts(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleDeleteProduct = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`${backendURL}/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        toast.success("Xóa sản phẩm thành công!");
      }
    } catch (error) {
      toast.error("Xóa sản phẩm thất bại! Vui lòng thử lại.");
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="bg-[var(--light-white)] rounded-xl h-full flex flex-col">
      <div
        id="table-header"
        className="flex gap-2 px-5 py-4 mb-4 flex-col md:flex-row md:items-center md:justify-between md:px-6"
      >
        <h3 class="text-lg font-title font-semibold text-gray-800">Danh sách sản phẩm</h3>
        <div className="flex gap-2 md:flex-row flex-col">
          <input
            placeholder="Tìm kiếm..."
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setCurrentPage(1);
            }}
            className="block w-full px-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm"
          />
          <button
            type="button"
            onClick={() => setSearchKeyword("")}
            class="flex-shrink-0 shadow-sm px-4 py-2 rounded-lg cursor-pointer text-[var(--dark-black)] text-sm tracking-wider font-medium bg-[var(--grey)] hover:bg-[var(--dark-white)] hover:ring-1 active:bg-[var(--grey)]"
          >
            Xem tất cả
          </button>
          <button
            type="button"
            onClick={() => setShowAddProductDialog(true)}
            class="flex-shrink-0 shadow-sm px-4 py-2 rounded-lg cursor-pointer text-white text-sm tracking-wider font-medium border border-current outline-none bg-[var(--primary-color)] hover:ring-1 hover:bg-[var(--light-primary-color)] active:bg-[var(--primary-color)]"
          >
            Thêm sản phẩm
          </button>
          <AddProductDialog
            open={showAddProductDialog}
            onClose={() => setShowAddProductDialog(false)}
            onConfirm={() => setShowAddProductDialog(false)}
          />
        </div>
      </div>

      <div class="relative overflow-x-auto shadow-md">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-[var(--dark-black)] bg-[var(--light-white)] border-y border-[var(--grey)]">
            <tr>
              <th scope="col" class="px-16 py-3">
                Hình ảnh
              </th>
              <th scope="col" class="px-6 py-3">
                Tên sản phẩm
              </th>
              <th scope="col" class="px-6 py-3">
                Số lượng
              </th>
              <th scope="col" class="px-6 py-3">
                Giá bán (VND)
              </th>
              <th scope="col" class="px-6 py-3">
                Giá gốc (VND)
              </th>
              <th scope="col" class="px-6 py-3">
                Hành động
              </th>
            </tr>
          </thead>
          {currentProductListPage && currentProductListPage.length > 0 ? (
            currentProductListPage.map((product, index) => (
              <tbody key={index}>
                <tr class="bg-white border-b border-gray-200 hover:bg-gray-50">
                  <td class="p-4">
                    <img src={product.thumbnailUrl} class="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                  </td>
                  <td class="px-6 py-4 text-[var(--light-black)]">{product.productName}</td>
                  <td class="px-6 py-4 text-[var(--light-black)]">{product.stockQuantity}</td>
                  <td class="px-6 py-4 text-[var(--light-black)]">{product.salePrice.toLocaleString()}</td>
                  <td class="px-6 py-4 text-[var(--light-black)]">{product.basePrice.toLocaleString()}</td>
                  <td class="px-6 py-4">
                    <div class="flex flex-col justify-items-center gap-2">
                      <button
                        type="button"
                        class="w-[50%] px-2 py-2 rounded-lg cursor-pointer text-white text-sm tracking-wider font-medium border border-current outline-none bg-green-700 hover:bg-green-800 active:bg-green-700"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.productId)}
                        type="button"
                        class="w-[50%] px-2 py-2 rounded-lg cursor-pointer text-white text-sm tracking-wider font-medium border border-current outline-none bg-red-700 hover:bg-red-800 active:bg-red-700"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <div className="flex justify-center items-center h-64 w-full text-gray-500">Không có sản phẩm nào</div>
          )}
        </table>
        <div className="flex justify-center p-8">
          <Pagination totalItems={products.length} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}

export default ProductManagementForm;
