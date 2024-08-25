import React from "react";
import starIcon from "/src/SVGs/HomePage/Tourist/icon _star_.svg";

const TourComment = ({ review }) => {
  return (
    <div className="tour-review">
      <div className="review-user">
        <img src={review.profilePicture} alt="user" />
        <h3>{review.username}</h3>
      </div>
      <div className="comment-container">
        <p className="review-comment">{review.comment}</p>
        <div className="rating-container">
          <p>{review.rating}</p>
          <img src={starIcon} alt="star" />
        </div>
      </div>
    </div>
  );
};

export default TourComment;
