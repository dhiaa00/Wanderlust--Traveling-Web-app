import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper/core";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./checkboxList.css";

SwiperCore.use([Navigation]);

const CheckboxList = ({ options }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    setCheckedItems((prevItems) => {
      if (checked) {
        return [...prevItems, value];
      } else {
        return prevItems.filter((item) => item !== value);
      }
    });
  };

  const renderCheckboxes = () => {
    const checkboxes = [];
    let checkboxIndex = 0;

    while (checkboxIndex < options.length) {
      const checkboxesInDiv1 = options.slice(checkboxIndex, checkboxIndex + 3);
      const checkboxesInDiv2 = options.slice(
        checkboxIndex + 3,
        checkboxIndex + 6
      );
      const checkboxesInDiv3 = options.slice(
        checkboxIndex + 6,
        checkboxIndex + 9
      );

      checkboxes.push(
        <SwiperSlide key={checkboxIndex}>
          <div className="checkbox-items">
            {renderCheckboxItems(checkboxesInDiv1)}
          </div>
          <div className="checkbox-items">
            {renderCheckboxItems(checkboxesInDiv2)}
          </div>
          <div className="checkbox-items">
            {renderCheckboxItems(checkboxesInDiv3)}
          </div>
        </SwiperSlide>
      );

      checkboxIndex += 6;
    }

    return checkboxes;
  };

  const renderCheckboxItems = (checkboxes) => {
    return checkboxes.map((option) => (
      <div className="checkbox-item" key={option.value}>
        <input
          className="checkbox"
          type="checkbox"
          id={option.value}
          value={option.value}
          checked={checkedItems.includes(option.value)}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={option.value}>{option.label}</label>
      </div>
    ));
  };

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView="auto"
      navigation={true}
      className="checkbox-list-container">
      {renderCheckboxes()}
    </Swiper>
  );
};

export default CheckboxList;
