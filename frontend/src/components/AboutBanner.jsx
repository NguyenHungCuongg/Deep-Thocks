import React from "react";
import { assets } from "../assets/assets";

function AboutBanner() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <img
        src={assets.about_banner_image}
        alt="About banner"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent z-10 h-full"></div>
      <div className="relative z-20 container mx-auto grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
          <h2 className="text-5xl font-extrabold mb-10 text-[var(--primary-color)]">Chúng tôi là ai?</h2>
          <p className="mb-8 text-[var(--grey)]">
            <span className="font-semibold">Deep Thocks</span> là một dự án e-commerce ra đời vào năm 2024, được sáng
            lập bởi một nhóm đam mê bàn phím cơ và công nghệ cá nhân hóa. Chúng tôi không đơn thuần là một cửa hàng trực
            tuyến – chúng tôi là một không gian dành cho những ai yêu âm thanh "deep thock" và cảm giác gõ độc đáo mà
            chỉ những chiếc bàn phím custom mới mang lại.
          </p>
          <p className="mb-8 text-[var(--grey)]">
            Từ những người mới bắt đầu với switch đầu tiên, đến các builder chuyên nghiệp theo đuổi từng milimet key
            travel, <span className="font-semibold">Deep Thocks</span> luôn có điều gì đó dành cho bạn.
          </p>
        </div>
        <div className="hidden md:block"></div>
      </div>
    </div>
  );
}

export default AboutBanner;
