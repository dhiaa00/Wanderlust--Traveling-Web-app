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

export default function TravelPagePictures({ travel }) {
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
          {[...travel.otherImagesUrl, travel.thumbImageUrl].map(
            (image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt="slide" />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </>
  );
}
