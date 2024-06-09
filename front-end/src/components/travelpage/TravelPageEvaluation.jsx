import React, { useEffect, useState } from "react";
import "/src/components/travelpage/travelpageevaluation.css";
import RateOffer from "./RateOffer";
import axios from "axios";
import toast from "react-hot-toast";

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

  return (
    <div className="travelpage-evaluation">
      <p className="travelpage-evaluation-title">Evaluation</p>
      <div className="stars-number-evaluation-container">
        <div className="rating-number-evaluation-container">
          <p className="rating-evaluation">{travel.rating}</p>
          <p className="number-evaluation">{reviews.length} review</p>
        </div>
        <div className="line-that-does-not-makesense">
          <div className="stars-evaluation-meter">
            <span className="green-chkoupi"></span>
          </div>
          <div className="stars-evaluation-meter">
            <span className="green-chkoupi"></span>
          </div>
          <div className="stars-evaluation-meter">
            <span className="green-chkoupi"></span>
          </div>
          <div className="stars-evaluation-meter">
            <span className="green-chkoupi"></span>
          </div>
          <div className="stars-evaluation-meter">
            <span className="green-chkoupi"></span>
          </div>
        </div>
        <div className="feedback-evaluation-container">
          <p className="feed-text-title">Feedback</p>
          <div className="this-stuff-is-really-notnecessary">
            {
              reviews.length != 0 && (
                // reviews.map((review, i) =>
                <p className="feedback-comment">
                  <span className="button-left"></span>
                  {reviews[0].comment}
                  <span className="button-right"></span>
                </p>
              )
              // )
            }
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
  );
};

export default TravelPageEvaluation;
