import React, { Suspense, useEffect, useState } from "react";
import TourComment from "./TourComment";
import "./tourComments.css";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const TourComments = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const tourId = window.location.pathname.split("/").pop();

  const [reviews, setReviews] = useState([]);
  console.log(reviews);

  const getReviews = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/offer/review/get/${tourId}`
      );
      setReviews(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="tour-comments">
      <h2>Comments</h2>
      <Suspense fallback={<CircularProgress disableShrink />}>
        {reviews.map((review) => (
          <TourComment key={review._id} review={review} />
        ))}
      </Suspense>
    </div>
  );
};

export default TourComments;
