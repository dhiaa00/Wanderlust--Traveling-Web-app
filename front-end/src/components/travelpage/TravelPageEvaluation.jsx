import React, { useState } from "react";
// Remove the unused CSS import statement
import RateOffer from "./RateOffer";
import axios from "axios";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import SwiperCore from "swiper/core";
SwiperCore.use([Pagination]);
import "./travelpageevaluation.css";

const TravelPageEvaluation = ({ travel, reviews }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");

  const handleMakeReview = async () => {
    try {
      // check if the user is logged in
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        toast.error("You need to be logged in to make a review");
        return;
      } else {
        const response = await axios.post(`${backendUrl}/offer/review/create`, {
          userId: user._id,
          offerId: travel._id,
          rating: rate,
          comment: comment,
        });
        if (response.status === 201) {
          toast.success("Review added successfully");
          setRate(0);
          setComment("");
        } else {
          toast.error("Failed to add review");
        }
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  // Corrected reduce function to initialize the accumulator and return it
  const starsNumbers = reviews.reduce(
    (acc, review) => {
      acc[review.rating] += 1;
      return acc;
    },
    [0, 0, 0, 0, 0, 0]
  );

  return (
    reviews && (
      <div className="travelpage-evaluation">
        <p className="travelpage-evaluation-title">Evaluation</p>
        <div className="stars-number-evaluation-container">
          <div className="rating-number-evaluation-container">
            <p className="rating-evaluation">{travel.rating}</p>
            <p className="number-evaluation">{reviews.length} review</p>
          </div>
          <div className="rating-lines">
            <div className="stars-evaluation-meter">
              <div className="rating-stars">0</div>
              <span
                className="green-bar"
                style={{
                  width: `${(starsNumbers[0] / reviews.length) * 100}%`,
                }}></span>
            </div>
            <div className="stars-evaluation-meter">
              <div className="rating-stars">1</div>
              <span
                className="green-bar"
                style={{
                  width: `${(starsNumbers[1] / reviews.length) * 100}%`,
                }}></span>
            </div>
            <div className="stars-evaluation-meter">
              <div className="rating-stars">2</div>
              <span
                className="green-bar"
                style={{
                  width: `${(starsNumbers[2] / reviews.length) * 100}%`,
                }}></span>
            </div>
            <div className="stars-evaluation-meter">
              <div className="rating-stars">3</div>
              <span
                className="green-bar"
                style={{
                  width: `${(starsNumbers[3] / reviews.length) * 100}%`,
                }}></span>
            </div>
            <div className="stars-evaluation-meter">
              <div className="rating-stars">4</div>
              <span
                className="green-bar"
                style={{
                  width: `${(starsNumbers[4] / reviews.length) * 100}%`,
                }}></span>
            </div>
            <div className="stars-evaluation-meter">
              <div className="rating-stars">5</div>
              <span
                className="green-bar"
                style={{
                  width: `${(starsNumbers[5] / reviews.length) * 100}%`,
                }}></span>
            </div>
          </div>
          <div className="feedback-evaluation-container">
            <p className="feed-text-title">Feedback</p>
            <div className="feedback-comment-container">
              {reviews.length !== 0 && (
                <Swiper
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  className="feedback-comment-swiper">
                  {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                      <p className="feedback-comment">{review.comment}</p>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </div>
        <div className="make-review">
          <RateOffer rate={rate} setRate={setRate} />
          <textarea
            name="review"
            id="review"
            placeholder="Write something"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}></textarea>
          <button className="make-review-button" onClick={handleMakeReview}>
            Make Review
          </button>
        </div>
      </div>
    )
  );
};

export default TravelPageEvaluation;
