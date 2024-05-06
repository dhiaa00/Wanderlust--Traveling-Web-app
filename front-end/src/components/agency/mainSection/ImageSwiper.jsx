import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ImageSwiper = ({ tour }) => {
  const images = tour.otherImagesUrl;
  return (
    <>
      {tour && (
        <div className="swiper-container">
          <div className="slide-caption-city">{tour.placeTo}</div>
          <div className="slide-caption">{tour.country}</div>
          <Swiper
            pagination={{}}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper">
            <SwiperSlide>
              <img
                width={700}
                height={300}
                src={tour.thumbImageUrl}
                alt="slide"
              />
            </SwiperSlide>
            {images &&
              images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img width={700} height={300} src={image} alt="slide" />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default ImageSwiper;
