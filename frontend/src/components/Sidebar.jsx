import React, { useState } from "react";

function Sidebar() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const toggleSideBar = () => {
    //Nếu menu đang mở thì đóng lại, nếu không thì mở ra
    setIsSideBarOpen((prev) => !prev);
  };

  const handleDashboardClick = () => {
    setIsSideBarOpen(false);
  };

  return (
    <div className="relative">
      <div id="hamburger-menu-section" className="md:hidden flex justify-start p-2">
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          className=" inline-flex p-2 w-10 h-10 justify-center text-sm text-[var(--primary-color)] rounded-lg hover:bg-[var(--light-black)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
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

      {isSideBarOpen && (
        <nav className="bg-white shadow-md border-r border-gray-200 h-screen block max-w-[10%] top-0 left-0 min-w-[250px] py-6 px-4 overflow-auto">
          <ul>
            <li>
              <a
                href="javascript:void(0)"
                onClick={handleDashboardClick}
                className="text-[var(--dark-black)] font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
              >
                Danh mục
              </a>
            </li>
          </ul>

          <div className="mt-4">
            <h6 className="text-[var(--primary-color)] text-sm font-semibold px-4">Quản lý</h6>
            <ul className="mt-2 space-y-1">
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-[var(--dark-black)] font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                >
                  Quản lý sản phẩm
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-[var(--dark-black)] font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                >
                  Quản lý người dùng
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-[var(--dark-black)] font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                >
                  Quản lý hóa đơn
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-[var(--dark-black)] font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                >
                  Quản lý khuyến mãi
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-[var(--dark-black)] font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                >
                  Quản lý doanh thu
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <h6 className="text-[var(--primary-color)] text-sm font-semibold px-4">Hành động</h6>
            <ul className="mt-2 space-y-1">
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-[var(--dark-black)] font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                >
                  Tài khoản cá nhân
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-[var(--dark-black)] font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                >
                  Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Sidebar;
