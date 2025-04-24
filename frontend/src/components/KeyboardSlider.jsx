import React from "react";
import { EffectCards, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import "swiper/css/autoplay";
import { assets } from "../assets/assets";

function KeyboardSlider() {
  const slideImages = [
    assets.keyboard_introduction_slide_1,
    assets.keyboard_introduction_slide_2,
    assets.keyboard_introduction_slide_3,
    assets.keyboard_introduction_slide_4,
    assets.keyboard_introduction_slide_5,
    assets.keyboard_introduction_slide_6,
  ];

  return (
    <div>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Autoplay]}
        loop={true} //lập vô hạn
        speed={800}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false, // Tiếp tục autoplay sau khi tương tác
        }}
        className="mySwiper"
      >
        {slideImages.map((item) => (
          <SwiperSlide key={item}>
            <div className="relative w-[100%] h-[300px] overflow-hidden rounded-lg shadow-lg">
              <img src={item} alt="keyboard-introduction" className="absolute w-full h-full object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default KeyboardSlider;
