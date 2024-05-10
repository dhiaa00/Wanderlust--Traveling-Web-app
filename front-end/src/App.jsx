import { Routes, Route, Outlet } from "react-router-dom";
import SignUp from "./pages/forms/SignUp";
import SignUpTourist from "./pages/forms/SignUpTourist";
import NavBar from "./components/navbar/NavBar";
import SignUpAgency from "./pages/forms/SignUpAgency";
import SingleTourPage from "./pages/Agency/SignleTour/SingleTourPage";
import ConfirmYourEmail from "./pages/forms/ConfirmYourEmail";
import AgencyTours from "./pages/Agency/Tours/AgencyTours";
import Login from "./pages/forms/login/Login";
import Modal from "react-modal";
import { Suspense, useState } from "react";
import AgencyNavbar from "./components/agency/navbar/AgencyNavbar";
import AgencyUpperSection from "./components/agency/upperSection/AgencyUpperSection";
import "/src/pages/Agency/Tours/agencyTours.css";
Modal.setAppElement("#root");
function App() {
  const [createTour, setCreateTour] = useState(false);
  const [tourCreated, setTourCreated] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [seachInput, setSearchInput] = useState("");

  return (
    <Routes>
      <Route
        path="/signup"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }>
        <Route index element={<SignUp />} />
        <Route path="tourist" element={<SignUpTourist />} />
        <Route path="agency" element={<SignUpAgency />} />
        <Route
          path="confirmation/:type/:confirmationId"
          element={<ConfirmYourEmail />}
        />
      </Route>
      <Route
        path="/login"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }>
        <Route index element={<Login />} />
      </Route>
      <Route
        path="/agency/:agencyId/"
        element={
          <div className="agencyTours signle-tour-page">
            <AgencyNavbar />
            <div className="agency-main-section">
              <AgencyUpperSection
                createTour={createTour}
                setCreateTour={setCreateTour}
                setTourCreated={setTourCreated}
                notificationsOpen={notificationsOpen}
                setNotificationsOpen={setNotificationsOpen}
                setSearchInput={setSearchInput}
              />
              <Outlet />
            </div>
          </div>
        }>
        <Route
          path="tours"
          element={
            <AgencyTours
              createTour={createTour}
              setCreateTour={setCreateTour}
              tourCreated={tourCreated}
              setTourCreated={setTourCreated}
              notificationsOpen={notificationsOpen}
              setNotificationsOpen={setNotificationsOpen}
              seachInput={seachInput}
            />
          }
        />
        <Route
          path="tours/:tourId"
          element={
            <SingleTourPage
              createTour={createTour}
              setCreateTour={setCreateTour}
              setTourCreated={setTourCreated}
              notificationsOpen={notificationsOpen}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
