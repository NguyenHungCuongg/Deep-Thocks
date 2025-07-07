import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const OAuth2Redirect = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      // Giải mã username từ token
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const username = decodedToken.username;
      login(username, token);
      toast.success("Đăng nhập Google thành công!");
      navigate("/"); // Chuyển về trang chủ hoặc trang mong muốn
    } else {
      toast.error("Không nhận được token từ Google!");
      navigate("/account/login");
    }
  }, [login, navigate]);

  return <div>Đang xác thực Google...</div>;
};

export default OAuth2Redirect;
