import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import RecommendedSwiperSlide from "./SwiperSlide";
import axios from "axios";

const RecommendedSwiper = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [travels, setTravels] = useState([]);

  const getRecommendedTravels = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("agency"))._id;
      const response = await axios.post(
        "http://localhost:8080/user/getRecommendation",
        {
          userId: userId,
        }
      );
      setTravels(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecommendedTravels();
  }, []);

  return (
    <>
      {isLoading ? (
        "loading..."
      ) : (
        <Swiper
          autoplay={{ delay: 3000 }}
          slidesPerView={"3"}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          loop={true}>
          {travels.map((travel, i) => (
            <SwiperSlide key={i}>
              <RecommendedSwiperSlide travel={travel} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default RecommendedSwiper;
