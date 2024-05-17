import React from "react";
import "./swiperSlide.css";
import starIcon from "/src/SVGs/HomePage/Tourist/icon _star_.svg";
import seeDetailsIcon from "/src/SVGs/HomePage/Tourist/see-details-button-icon.svg";
import testImage from "/src/images/testing/japan/japan1.png";

const RecommendedSwiperSlide = ({ travel }) => {
  const tour = travel;
  return (
    <div className="recommended-swiper-slide">
      <div className="country recommend-slide-element">{tour.country}</div>
      <div className="place-to recommend-slide-element">{tour.placeTo}</div>
      <div className="rating recommend-slide-element">
        4.5 <img src={starIcon} alt="star" />
      </div>
      <div className="see-details-button recommend-slide-element">
        <img src={seeDetailsIcon} alt="icon" />
        See Details
      </div>
      <img
        className="swiper-main-image"
        src={travel.thumbImageUrl}
        alt="tour image"
      />
    </div>
  );
};

export default RecommendedSwiperSlide;
