import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import InputBar from "../components/InputBar";
import GoogleAuthOption from "../components/GoogleAuthOption";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const backendURL = "http://localhost:8080";
  const navigate = useNavigate();

  const customCheckboxStyle = {
    color: "#2f2f2f",
    "&.Mui-checked": {
      color: "#c3a07e",
    },
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu và mật khẩu xác thực không khớp");
      return;
    }

    try {
      const response = await axios.post(`${backendURL}/api/auth/register`, {
        email: email,
        phone: phoneNumber,
        fullname: fullName,
        username: userName,
        password: password,
      });
      if (response.status === 200) {
        toast.success("Đăng ký thành công!");
        navigate("/account/login");
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data); // Thông báo lỗi từ backend
      } else {
        toast.error("Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div class="min-h-screen flex fle-col items-center justify-center py-6 px-4">
      <div class="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
        <div>
          <h2 class="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-slate-900">
            Tham gia cộng đồng <span className="text-[var(--primary-color)]">Deep Thocks</span>
          </h2>
          <p class="text-sm mt-6 text-slate-500 leading-relaxed">
            Tạo tài khoản để nhận ưu đãi độc quyền, lưu trữ bộ sưu tập bàn phím của bạn và nhận thông báo sớm về sản
            phẩm mới.
          </p>
          <p class="text-sm mt-12 text-slate-500">
            Đã có tài khoản?{" "}
            <a href="/account/login" class="text-[var(--primary-color)] font-medium hover:underline ml-1">
              Đăng nhập ở đây!
            </a>
          </p>
        </div>

        <form class="max-w-md md:ml-auto w-full py-8" onSubmit={handleRegister}>
          <h3 class="text-slate-900 lg:text-3xl text-2xl font-bold mb-8 font-title">Form đăng ký</h3>

          <div class="space-y-6">
            <InputBar
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              name="email"
              type="email"
              placeholder="Nhập Email"
            />
            <InputBar
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              label="Số điện thoại"
              name="phonenumber"
              type="number"
              placeholder="Nhập số điện thoại"
            />
            <InputBar
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Họ và tên"
              name="fullname"
              type="fullname"
              placeholder="Nhập họ và tên"
            />
            <InputBar
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              label="Tên đăng nhập"
              name="username"
              type="text"
              placeholder="Nhập tên đăng nhập"
            />
            <InputBar
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Mật khẩu"
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
            />
            <InputBar
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Mật khẩu xác thực"
              name="password"
              type="password"
              placeholder="Nhập mật khẩu xác thực"
            />
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center">
                <Checkbox sx={customCheckboxStyle} />
                <label for="remember-me" class="ml-3 block text-sm text-gray-700">
                  Ghi nhớ tài khoản
                </label>
              </div>
              <div class="text-sm">
                <a
                  href="jajvascript:void(0);"
                  class="text-[var(--primary-color)] hover:text-[var(--light-primary-color)] font-medium"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>
          </div>

          <div class="!mt-12">
            <button
              type="submit"
              class="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[var(--primary-color)] hover:bg-[var(--light-primary-color)] focus:outline-none"
            >
              Đăng ký
            </button>
          </div>

          <div class="my-4 flex items-center gap-4">
            <hr class="w-full border-slate-300" />
            <p class="text-sm text-slate-800 text-center">or</p>
            <hr class="w-full border-slate-300" />
          </div>

          <div class="space-x-6 flex justify-center">
            <GoogleAuthOption />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
