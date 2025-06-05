import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CategoryOptionForm from "./CategoryOptionForm";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { categories } from "../data/categories";

function UpdateProductDialog(props) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategoryId, setProductCategoryId] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  useEffect(() => {
    if (props.product) {
      setProductName(props.product.productName || "");
      setProductDescription(props.product.productDescription || "");
      setProductCategoryId(props.product.categoryId || "");
      setStockQuantity(props.product.stockQuantity || "");
      setBasePrice(props.product.basePrice || "");
      setSalePrice(props.product.salePrice || "");
    }
  }, [props.product]);

  if (!props.product) return null;

  const handleUpdatingProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const productCreateDTO = {
      productName,
      productDescription,
      categoryId: productCategoryId,
      stockQuantity: parseInt(stockQuantity),
      basePrice: parseFloat(basePrice),
      salePrice: parseFloat(salePrice),
    };
    try {
      const response = await axios.put(`${backendURL}/api/products/${props.product.productId}`, productCreateDTO, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        toast.success("Cập nhật sản phẩm thành công!");
        props.onClose();
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Cập nhật sản phẩm thất bại! Vui lòng thử lại.");
    }
  };

  const customCancelButtonStyle = {
    color: "#2f2f2f",
    "&.MuiButton-text": {
      color: "#c3a07e",
    },
  };

  const customConfirmButtonStyle = {
    backgroundColor: "var(--dark-black)",
    color: "var(--light-white)",
    "&:hover": {
      backgroundColor: "var(--light-black)",
      color: "var(--light-white)",
    },
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Sửa sản phẩm</DialogTitle>
      <form onSubmit={handleUpdatingProduct}>
        <DialogContent>
          <div className="flex flex-col gap-4">
            <div>
              <label class="block mb-2 text-sm font-medium text-[var(--dark-black)]">Tên sản phẩm</label>
              <input
                id="product-name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                placeholder="Tên sản phẩm"
                required
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-[var(--dark-black)]">Mô tả sản phẩm</label>
              <textarea
                id="product-name"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                placeholder="Mô tả sản phẩm"
                rows="4"
                required
              />
            </div>
            <div>
              <CategoryOptionForm
                label="Thể loại"
                options={categories}
                value={productCategoryId}
                onChange={(e) => setProductCategoryId(e.target.value)}
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-[var(--dark-black)]">Số lượng</label>
              <input
                id="stock-quantity"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                placeholder="Số lượng tồn kho"
                required
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-[var(--dark-black)]">Giá sản phẩm</label>
              <div class="flex gap-4">
                <input
                  id="sale-price"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                  placeholder="Giá bán"
                  required
                />
                <input
                  id="base-price"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                  placeholder="Giá gốc"
                  required
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button sx={customCancelButtonStyle} onClick={props.onClose}>
            Hủy
          </Button>
          <Button type="submit" sx={customConfirmButtonStyle} autoFocus>
            Sửa thông tin sản phẩm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default UpdateProductDialog;
