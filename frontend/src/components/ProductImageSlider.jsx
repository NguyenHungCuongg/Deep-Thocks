import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { assets } from "../assets/assets";
import { Pagination, Navigation } from "swiper/modules";

function ProductImageSlider() {
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
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {slideImages.map((item) => (
          <SwiperSlide key={item}>
            <div className="relative w-[100%] h-[500px] overflow-hidden rounded-lg shadow-lg">
              <img src={item} alt="keyboard-introduction" className="absolute w-full h-full object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductImageSlider;
