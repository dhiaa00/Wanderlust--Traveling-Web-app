import { useEffect, useState } from "react";
import mainImage from "/src/SVGs/HomePage/Tourist/main-image.svg";
import "./main-travel-page.css";
import TravelPageSearch from "../../../components/tourist/TravelPageSearch";
import RecommendedSwiper from "../../../components/tourist/RecommendedSwiper";
import TravelCard from "../../../components/tourist/TravelCard";
import Footer from "../../../components/tourist/Footer";
import { paginate } from "../../../utils/paginate";
import axios from "axios"; // Add this line
import TravelPagePagination from "../Pagination/TravelPagePagination";
import { CircularProgress } from "@mui/material";

const TravelPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [travelList, setTravelList] = useState([]);
  const [pagesNumber, setPagesNumber] = useState(0);
  const [currentTravels, setCurrentTravels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getTravels = async () => {
    try {
      const response = await axios.get(
        "https://wanderlust-backend-server.onrender.com/user/getOffers"
      );
      setTravelList(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTravels();
  }, []);

  useEffect(() => {
    const result = paginate(travelList.length, currentPage, travelList);
    setPagesNumber(result.pagesNumber);
    setCurrentTravels(result.currentTours);
  }, [travelList, currentPage]);

  return (
    <>
      <div className="main-travel-page">
        <div className="hero-section">
          <img src={mainImage} alt="main-image" />
          <TravelPageSearch />
        </div>
        <div className="recommended-travels">
          <h2>Recommended:</h2>
          <div className="recommended-travels-container">
            <RecommendedSwiper travelList={travelList} />
          </div>
          <div className="all-travels">
            <h2>All:</h2>
            <div className="all-travels-container">
              {isLoading ? (
                <CircularProgress disableShrink />
              ) : (
                currentTravels &&
                currentTravels.map((travel) => (
                  <TravelCard travel={travel} key={travel.id} />
                ))
              )}
            </div>
            <div className="travel-page-pagination">
              <TravelPagePagination
                pagesNumber={pagesNumber}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TravelPage;
