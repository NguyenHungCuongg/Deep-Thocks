import React from "react";
import { assets } from "../assets/assets";

function AboutWhySection() {
  return (
    <div className="bg-[var(--light-black)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="flex flex-col space-y-4 order-1 md:order-2 md:row-span-1 aspect-[1]">
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={assets.about_why_image}
              alt="keyboard-introduction"
              className="absolute min-w-full min-h-full w-auto h-auto object-cover p-[10%]"
            />
          </div>
        </div>
        <div className="py-6 px-[16%] order-2 md:order-1 flex flex-col justify-center items-start">
          <h2 className="text-4xl font-bold pl-4 mb-8 font-title text-[var(--primary-color)]">
            Tại sao lại là "Deep Thocks"?
          </h2>
          <p className="text-[var(--grey)] pl-4 mb-8">
            Tên gọi <span className="font-semibold">"Deep Thocks"</span> là cách chúng tôi thể hiện tình yêu với âm
            thanh trầm ấm, dễ chịu mà những bộ phím chất lượng mang lại. Với mỗi lần gõ phím, bạn không chỉ gửi đi một
            lệnh – mà là truyền một cảm xúc.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutWhySection;
