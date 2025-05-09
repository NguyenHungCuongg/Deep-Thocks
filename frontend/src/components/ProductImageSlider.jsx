import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

function ProductImageSlider(props) {
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
        {props.slideImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-[100%] h-[500px] overflow-hidden rounded-lg shadow-lg">
              <img src={image.url} alt={image.altText} className="absolute w-full h-full object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductImageSlider;
