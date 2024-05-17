import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "/src/components/travelpage/travelpagepictures.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function TravelPagePictures() {
  const [swiperRef, setSwiperRef] = useState(null);

  let appendNumber = 4;
  let prependNumber = 1;

  const prepend2 = () => {
    swiperRef.prependSlide([
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
    ]);
  };

  const prepend = () => {
    swiperRef.prependSlide(
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>"
    );
  };

  const append = () => {
    swiperRef.appendSlide(
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>"
    );
  };

  const append2 = () => {
    swiperRef.appendSlide([
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
    ]);
  };

  return (
    <>
      <div className="travelpagepictures-container">
        <p>Pictures</p>
        <Swiper
          initialSlide={2}
          onSwiper={setSwiperRef}
          slidesPerView={2}
          centeredSlides={true}
          spaceBetween={10}
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper">
          <SwiperSlide>
            <img
              src="/src/images/travelpage/TravelpagePictures/1262499a99b7a4673e7318c74fee1c98.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/src/images/travelpage/TravelpagePictures/9ffaa2c4b10dd2edc5386afc8f1b6849.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/src/images/travelpage/TravelpagePictures/c6dc2cbfb7c07764c72f775338baf2eb.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/src/images/travelpage/TravelpagePictures/1262499a99b7a4673e7318c74fee1c98.png"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
