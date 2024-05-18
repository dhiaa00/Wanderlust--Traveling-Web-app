import React, { useEffect, useState } from "react";
import TravelPageHeader from "../../../components/travelpage/TravelPageHeader";
import TravelPagePictures from "../../../components/travelpage/TravelPagePictures";
import TravelPageDescription from "../../../components/travelpage/TravelPageDescription";
import TravelPageEvaluation from "../../../components/travelpage/TravelPageEvaluation";
import TravelPagePrice from "../../../components/travelpage/TravelPagePrice";
import "./travelspage.css";
import axios from "axios";
import { CircularProgress } from "@mui/material";
const SingleTravelPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [travel, setTravel] = useState({});

  const id = window.location.pathname.split("/").pop();

  const getTravel = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/getOffer/${id}`
      );
      setTravel(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const collectPreferences = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const travelTags =
      travel.categories.length != 0 ? travel.categories[0].split(", ") : [];
    console.log(travelTags);
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
        `http://localhost:8080/updatePreferences/${id}`,
        {
          preferences: userPreferences,
        }
      );
      console.log(response);
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
          <div className="background-image-container">
            <img
              src={travel.thumbImageUrl}
              alt="Travel Image"
              className="background-image"
            />
          </div>
          <TravelPageHeader travel={travel} />
          <TravelPagePictures travel={travel} />
          <TravelPageDescription description={travel.description} />
          <TravelPageEvaluation travel={travel} />
          <TravelPagePrice travel={travel} />
        </div>
      )}
    </>
  );
};

export default SingleTravelPage;
