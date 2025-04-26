import React from "react";
import { assets } from "../assets/assets";

function AboutMissionSection() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="flex flex-col space-y-4 order-1 md:order-2 md:row-span-1 aspect-[1]">
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={assets.about_mission_image}
              alt="keyboard-introduction"
              className="absolute min-w-full min-h-full w-auto h-auto object-cover"
            />
          </div>
        </div>
        <div className="py-6 px-[16%] order-2 md:order-2 flex flex-col justify-center items-start">
          <h2 className="text-4xl font-bold pl-4 mb-4 font-title text-[var(--dark-black)]">Nhiệm vụ của chúng tôi</h2>
          <p className="text-gray-700 pl-4 mb-4">
            Chúng tôi muốn đơn giản hóa hành trình tìm kiếm và sở hữu một chiếc bàn phím "chân ái". Deep Thocks hướng
            tới việc cung cấp:
          </p>{" "}
          <ul className="list-disc pl-8 mb-4 text-gray-700">
            <li className="mb-2">Các bộ kit chất lượng cao với giá hợp lý</li>
            <li className="mb-2">Keycaps độc đáo, mang cá tính riêng</li>
            <li className="mb-2">Switches cao cấp từ tactile đến linear, silent đến clacky</li>
            <li className="mb-2">
              Và đặc biệt là trải nghiệm mua hàng liền mạch, tinh gọn – từ trình duyệt đến bàn phím của bạn
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutMissionSection;
