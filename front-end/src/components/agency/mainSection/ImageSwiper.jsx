import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import japan1 from "../../../images/testing/japan/japan1.png";
import japan2 from "/src/images/testing/japan/japan2.jpg";

const ImageSwiper = () => {
  return (
    <div className="swiper-container">
      <Swiper
        pagination={{}}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper">
        <SwiperSlide>
          <img src={japan1} alt="slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={japan2} alt="slide" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ImageSwiper;
