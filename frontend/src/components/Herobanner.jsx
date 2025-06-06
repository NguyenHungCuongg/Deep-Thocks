import React from "react";
import { assets } from "../assets/assets";

function HeroBanner() {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={assets.hero_banner_image}
          alt="Background Image"
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 className="md:text-5xl md:font-black text-3xl font-extrabold font-title leading-tight mb-4 px-[4%] text-[var(--primary-color)]">
          XÂY DỰNG CHIẾC <br />
          BÀN PHÍM MƠ ƯỚC CỦA BẠN.
        </h1>
        <p className="md:text-lg text-[var(--grey)] mb-8 font-content md:px-[30%] px-[10%]">
          Tự do lựa chọn switch, keycap, case và hơn thế nữa – chiếc bàn phím hoàn hảo do chính bạn thiết kế đang chờ
          đón. Bắt đầu hành trình custom ngay hôm nay!
        </p>
        <a
          href="/products"
          className="bg-[var(--primary-color)] text-gray-900 hover:bg-[var(--light-primary-color)] py-4 px-8 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          Khám phá ngay!
        </a>
      </div>
    </div>
  );
}

export default HeroBanner;
