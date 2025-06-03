import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CategoryOptionForm from "./CategoryOptionForm";
import Button from "@mui/material/Button";
import { categories } from "../data/categories";

function AddProductDialog(props) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");

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
      <DialogTitle id="alert-dialog-title">Thêm sản phẩm</DialogTitle>
      <form>
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
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
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
            <div>
              <label class="block mb-2 text-sm font-medium text-[var(--dark-black)]">Hình ảnh sản phẩm</label>
              <input
                type="file"
                multiple
                accept="image/*"
                class="w-full text-slate-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-[var(--dark-black)] file:hover:bg-[var(--light-black)] file:text-white rounded"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button sx={customCancelButtonStyle} onClick={props.onClose}>
            Hủy
          </Button>
          <Button sx={customConfirmButtonStyle} onClick={props.onConfirm} autoFocus>
            Thêm sản phẩm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddProductDialog;
