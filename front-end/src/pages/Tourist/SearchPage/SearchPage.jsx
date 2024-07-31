import { useEffect, useState } from "react";
import mainImage from "/src/SVGs/HomePage/Tourist/main-image.svg";
import TravelPageSearch from "../../../components/tourist/TravelPageSearch";
import TravelCard from "../../../components/tourist/TravelCard";
import Footer from "../../../components/tourist/Footer";
import { paginate } from "../../../utils/paginate";
import axios from "axios"; // Add this line
import TravelPagePagination from "../Pagination/TravelPagePagination";
import { CircularProgress } from "@mui/material";
import "./searchPage.css";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const path = location.pathname.split("/").pop();
  const [isLoading, setIsLoading] = useState(false);
  const [travelList, setTravelList] = useState([]);
  const [pagesNumber, setPagesNumber] = useState(0);
  const [currentTravels, setCurrentTravels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState({
    destination: path.split("&")[0].split("=")[1] || "",
    budget: path.split("&")[1].split("=")[1] || "",
    startDate: path.split("&")[2].split("=")[1] || "",
    endDate: path.split("&")[3].split("=")[1] || "",
  });

  useEffect(() => {
    const result = paginate(travelList.length, currentPage, travelList);
    setPagesNumber(result.pagesNumber);
    setCurrentTravels(result.currentTours);
  }, [travelList, currentPage]);

  useEffect(() => {
    setIsLoading(true);
    const destination = location.pathname.split("&")[0].split("=")[1] || "";
    const budget = location.pathname.split("&")[1].split("=")[1] || "";
    const startDate = location.pathname.split("&")[2].split("=")[1] || "";
    const endDate = location.pathname.split("&")[3].split("=")[1] || "";
    setQuery({
      destination: destination,
      budget: budget,
      startDate: startDate,
      endDate: endDate,
    });
    const getTravels = async () => {
      const linkIncludedQuery = `?destination=${destination}&startDate=${startDate}&endDate=${endDate}&budget=${budget}`;
      try {
        const response = await axios.get(
          `${backendUrl}/user/search${linkIncludedQuery}`
        );
        setTravelList(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getTravels();
  }, [location]);

  return (
    <>
      <div className="main-travel-page">
        <div className="hero-section">
          <img src={mainImage} alt="main-image" />
          <TravelPageSearch query={query} />
        </div>
        <div className="recommended-travels">
          <div className="all-travels">
            <h2>Search Result:</h2>
            <div className="all-travels-container">
              {isLoading ? (
                <CircularProgress disableShrink />
              ) : currentTravels && currentTravels.length > 0 ? (
                currentTravels.map((travel) => (
                  <TravelCard travel={travel} key={travel._id} />
                ))
              ) : (
                <h2>No travel found</h2>
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

export default SearchPage;
