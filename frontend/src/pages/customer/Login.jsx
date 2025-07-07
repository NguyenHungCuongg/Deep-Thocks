import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import InputBar from "../../components/InputBar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GoogleAuthOption from "../../components/GoogleAuthOption";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}/api/auth/login`, {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        const jwtToken = response.data; //response.data ở đây là jwtToken đã được truyền thông qua ResponseEntity.ok(jwtToken)
        login(username, jwtToken); // Lưu token vào localStorage
        console.log("Người dùng: ", username);
        console.log("Token: ", response.data);
        toast.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data); // Thông báo lỗi từ backend
      } else {
        //Nếu lỗi này không được trả về từ backend, ta tự định nghĩa lỗi
        toast.error("Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.");
      }
    }
  };

  const customCheckboxStyle = {
    color: "#2f2f2f",
    "&.Mui-checked": {
      color: "#c3a07e",
    },
  };

  return (
    <div class="min-h-screen flex fle-col items-center justify-center py-6 px-4">
      <div class="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
        <div>
          <h2 class="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-slate-900">
            Chào mừng trở lại với <span className="text-[var(--primary-color)]">Deep Thocks</span>
          </h2>
          <p class="text-sm mt-6 text-slate-500 leading-relaxed">
            Đăng nhập để quản lý đơn hàng, theo dõi sản phẩm yêu thích và khám phá những phụ kiện bàn phím mới nhất.
          </p>
          <p class="text-sm mt-12 text-slate-500">
            Chưa có tài khoản?{" "}
            <a href="/account/register" class="text-[var(--primary-color)] font-medium hover:underline ml-1">
              Đăng ký ở đây!
            </a>
          </p>
        </div>
        <form class="max-w-md md:ml-auto w-full" onSubmit={handleLogin}>
          <h3 class="text-slate-900 lg:text-3xl text-2xl font-bold mb-8 font-title">Form đăng nhập</h3>
          <div class="space-y-6">
            <InputBar
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              type="text"
              placeholder="Nhập tên tài khoản"
              label="Tên tài khoản"
            />
            <InputBar
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              label="Mật khẩu"
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
              Đăng nhập
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
};

export default Login;
