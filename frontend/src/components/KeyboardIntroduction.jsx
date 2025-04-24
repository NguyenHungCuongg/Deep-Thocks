import React from "react";
import { assets } from "../assets/assets";
import KeyboardSlider from "./KeyboardSlider";

function KeyboardIntroduction() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-4 order-1 md:order-2 md:row-span-2 aspect-[1]">
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={assets.keyboard_introduction_image}
              alt="keyboard-introduction"
              className="absolute min-w-full min-h-full w-auto h-auto object-cover"
            />
          </div>
        </div>
        <div className="py-6 px-[16%] order-2 md:order-1 flex flex-col justify-end">
          <h2 className="text-2xl font-bold pl-4 mb-4 font-title text-[var(--dark-black)]">Bàn phím - Keyboard</h2>
          <p className="text-gray-700 pl-4 mb-4">
            Một chiếc bàn phím custom không đơn thuần là công cụ gõ phím, mà là một cách thể hiện phong cách của chính
            bạn. Được chế tác tỉ mỉ từ switch êm ái, keycap cao cấp đến thiết kế độc bản, mỗi tác phẩm đều mang đến trải
            nghiệm gõ phím tuyệt vời - nhanh nhạy cho game thủ, chuẩn xác cho dân văn phòng và đầy cảm hứng cho
            creators. Đầu tư một chiếc bàn phím custom chính là nâng cấp đẳng cấp làm việc và giải trí mỗi ngày!
          </p>
          <p className="pl-4 italic">
            Tại <span className="font-semibold">DEEP THOCKS</span>, chúng tôi biến đam mê của bạn thành hiện thực.
          </p>
        </div>
        <div className="overflow-hidden py-6 px-[16%] order-3 md:order-3">
          <KeyboardSlider />
        </div>
      </div>
    </div>
  );
}

export default KeyboardIntroduction;
