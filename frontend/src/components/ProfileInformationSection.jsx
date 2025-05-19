import React from "react";

function ProfileInformationSection(props) {
  if (!props.user) {
    return (
      <div className="max-w-lg mx-auto bg-white overflow-hidden md:max-w-4xl">
        <div className="flex justify-between items-start pt-12">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Đang tải thông tin...</h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-lg mx-auto bg-white overflow-hidden md:max-w-4xl">
      <div className="flex justify-between items-start pt-12">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Xin chào, {props.user.fullname ? props.user.fullname : "undefined"}
          </h1>
          <p className="mt-1 text-gray-500">Quản lí tài khoản của bạn tại đây</p>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Họ và tên</dt>
            <dd className="mt-1 text-sm text-[var(--dark-black)] sm:mt-0 sm:col-span-2">{props.user.fullname}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Tên đăng nhập</dt>
            <dd className="mt-1 text-sm text-[var(--dark-black)] sm:mt-0 sm:col-span-2">{props.user.username}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Địa chỉ email</dt>
            <dd className="mt-1 text-sm text-[var(--dark-black)] sm:mt-0 sm:col-span-2">{props.user.email}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Số điện thoại</dt>
            <dd className="mt-1 text-sm text-[var(--dark-black)] sm:mt-0 sm:col-span-2">{props.user.phone}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Tài khoản tạo từ</dt>
            <dd className="mt-1 text-sm text-[var(--dark-black)] sm:mt-0 sm:col-span-2">{props.user.createdAt}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default ProfileInformationSection;
