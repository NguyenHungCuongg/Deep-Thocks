import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";

function UserManagementForm() {
  const [users, setUsers] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const lastPageIndex = currentPage * itemsPerPage;
  const firstPageIndex = lastPageIndex - itemsPerPage;
  const filteredUsers = users.filter((user) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      user.fullname.toLowerCase().includes(keyword) ||
      user.username.toLowerCase().includes(keyword) ||
      user.phone.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword)
    );
  });
  const currentUserListPage = filteredUsers.slice(firstPageIndex, lastPageIndex);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${backendURL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("User API response:", response.data);
        setUsers(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="bg-[var(--light-white)] h-full rounded-2xl border border-gray-300 pb-5 pt-5 sm:px-6 sm:pt-5 flex flex-col">
      <div
        id="table-header"
        className="flex gap-2 px-5 py-4 mb-4 flex-col md:flex-row md:items-center md:justify-between md:px-6"
      >
        <h3 class="text-lg font-title font-semibold text-gray-800">Danh sách người dùng</h3>
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
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-[var(--dark-black)] bg-[var(--light-white)] border-y border-[var(--grey)]">
            <tr>
              <th scope="col" class="px-16 py-3">
                Họ và tên
              </th>
              <th scope="col" class="px-6 py-3">
                Tên đăng nhập
              </th>
              <th scope="col" class="px-6 py-3">
                Số điện thoại
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Ngày tạo tài khoản
              </th>
            </tr>
          </thead>

          <tbody class="bg-white divide-y divide-gray-200 whitespace-nowrap">
            {currentUserListPage && currentUserListPage.length > 0 ? (
              currentUserListPage.map((user, index) => (
                <tr key={index}>
                  <td class="px-4 py-4 text-sm text-slate-900 font-medium">{user.fullname}</td>
                  <td class="px-4 py-4 text-sm text-slate-600 font-medium">{user.username}</td>
                  <td class="px-4 py-4 text-sm text-slate-600 font-medium">{user.phone}</td>
                  <td class="px-4 py-4 text-sm text-slate-600 font-medium">{user.email}</td>
                  <td class="px-4 py-4 text-sm text-slate-600 font-medium">
                    {user.createdAt ? new Date(user.createdAt).toLocaleString() : ""}
                  </td>
                </tr>
              ))
            ) : (
              <div className="flex justify-center items-center h-64 w-full text-gray-500">Không có người dùng nào</div>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center p-8">
        <Pagination totalItems={users.length} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}

export default UserManagementForm;
