import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ConfirmDialog from "./ConfirmDialog";

function Sidebar(props) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { logout } = useContext(AuthContext);

  const toggleSideBar = () => {
    //Nếu menu đang mở thì đóng lại, nếu không thì mở ra
    setIsSideBarOpen((prev) => !prev);
  };

  const handleDashboardClick = () => {
    setIsSideBarOpen(false);
  };

  return (
    <div className="relative">
      {!isSideBarOpen && (
        <div id="hamburger-menu-section" className="flex justify-start p-2 h-screen">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className=" inline-flex p-2 w-10 h-10 justify-center text-sm text-[var(--primary-color)] rounded-lg hover:ring-2 hover:ring-[var(--light-primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            aria-controls="navbar-sticky"
            aria-expanded={isSideBarOpen}
            onClick={toggleSideBar}
          >
            <svg
              className="w-5 h-5 text-[var(--primary-color)]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      )}

      {isSideBarOpen && (
        <nav className="bg-white shadow-md border-r border-gray-200 h-screen block max-w-[10%] top-0 left-0 min-w-[250px] py-6 px-4 overflow-auto">
          <ul>
            <li>
              <button
                onClick={handleDashboardClick}
                className="text-[var(--dark-black)] font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
              >
                Danh mục
              </button>
            </li>
          </ul>

          <div className="mt-4">
            <h6 className="text-[var(--primary-color)] text-sm font-semibold px-4">Quản lý</h6>
            <ul className="mt-2 space-y-1">
              <li>
                <button
                  onClick={() => props.setSelectedForm("product")}
                  className="text-[var(--dark-black)] font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                >
                  Quản lý sản phẩm
                </button>
              </li>
              <li>
                <button
                  onClick={() => props.setSelectedForm("user")}
                  className="text-[var(--dark-black)] font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                >
                  Quản lý người dùng
                </button>
              </li>
              <li>
                <button
                  onClick={() => props.setSelectedForm("bill")}
                  className="text-[var(--dark-black)] font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                >
                  Quản lý hóa đơn
                </button>
              </li>
              <li>
                <button
                  onClick={() => props.setSelectedForm("sale")}
                  className="text-[var(--dark-black)] font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                >
                  Quản lý khuyến mãi
                </button>
              </li>
              <li>
                <button
                  onClick={() => props.setSelectedForm("income")}
                  className="text-[var(--dark-black)] font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                >
                  Quản lý doanh thu
                </button>
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <h6 className="text-[var(--primary-color)] text-sm font-semibold px-4">Hành động</h6>
            <ul className="mt-2 space-y-1">
              <li>
                <button className="text-[var(--dark-black)] font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all">
                  Tài khoản cá nhân
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowConfirmDialog(true)}
                  className="text-[var(--dark-black)] font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                >
                  Đăng xuất
                </button>
                <ConfirmDialog
                  title="Xác nhận đăng xuất"
                  content="Bạn có chắc chắn muốn đăng xuất không?"
                  open={showConfirmDialog}
                  onClose={() => setShowConfirmDialog(false)}
                  onConfirm={() => {
                    logout();
                    setShowConfirmDialog(false);
                  }}
                />
              </li>
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Sidebar;
