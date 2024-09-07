import React, { useEffect, useState } from "react";
import TravelPageHeader from "../../../components/travelpage/TravelPageHeader";
import TravelPagePictures from "../../../components/travelpage/TravelPagePictures";
import TravelPageDescription from "../../../components/travelpage/TravelPageDescription";
import TravelPageEvaluation from "../../../components/travelpage/TravelPageEvaluation";
import TravelPagePrice from "../../../components/travelpage/TravelPagePrice";
import "./travelspage.css";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import returnIcon from "../../../SVGs/travelpage/return-to-homepage.svg";
import { Link } from "react-router-dom";

const SingleTravelPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [travel, setTravel] = useState({});
  const [reviews, setReviews] = useState([]);

  const id = window.location.pathname.split("/").pop();
  const user = JSON.parse(localStorage.getItem("user"));

  const getTravel = async () => {
    try {
      const response = await axios.get(`${backendUrl}/user/getOffer/${id}`);
      setTravel(response.data.data);
      await getReviews();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const collectPreferences = () => {
    if (!user) return;

    const travelTags =
      travel.categories.length != 0 ? travel.categories[0].split(", ") : [];
    // join them to the userPreferences as this example "luxury, beach, sea, summer"
    const localUserPreferences = user.preferences || [];
    const userPreferencesSet = new Set([
      ...localUserPreferences,
      ...travelTags,
    ]);
    const userPreferences = [...userPreferencesSet];

    // save them to db and to local storage
    try {
      const response = axios.post(
        `${backendUrl}/user/updatePreferences/${user._id}`,
        {
          preferences: userPreferences,
        }
      );
    } catch (err) {
      console.log(err);
    }
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        preferences: userPreferences,
      })
    );
  };

  // handling reviews
  const [currentReviewSlice, setCurrentReviewSlice] = useState(0);
  const [hasMoreReviews, setHasMoreReviews] = useState(false);
  const [userReviewed, setUserReviewed] = useState(false);

  const getReviews = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/offer/review/get/${id}`,
        {
          userId: user._id,
          reviewSlice: currentReviewSlice,
        }
      );
      setReviews(response.data.data);
      setHasMoreReviews(response.data.hasMore);
      setUserReviewed(response.data.userReviewed);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    currentReviewSlice !== 0 && getReviews();
  }, [currentReviewSlice]);

  //

  useEffect(() => {
    getTravel();
  }, []);

  useEffect(() => {
    !isLoading && collectPreferences();
  }, [travel]);

  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <CircularProgress disableShrink />
        </div>
      ) : (
        <div className="travel_page">
          <div className="return-to-homepage-button">
            <img src={returnIcon} alt="return to homepage" />
            <Link to="../">Return</Link>
          </div>
          <div className="background-image-container">
            <img
              src={travel.thumbImageUrl}
              alt="Travel Image"
              className="background-image"
            />
          </div>
          <TravelPageHeader travel={travel} reviews={reviews} />
          <TravelPagePictures travel={travel} />
          <TravelPageDescription description={travel.description} />
          <TravelPageEvaluation
            travel={travel}
            reviews={reviews}
            currentReviewSlice={currentReviewSlice}
            setCurrentReviewSlice={setCurrentReviewSlice}
            hasMoreReviews={hasMoreReviews}
            userReviewed={userReviewed}
          />
          <TravelPagePrice travel={travel} />
        </div>
      )}
    </>
  );
};

export default SingleTravelPage;
