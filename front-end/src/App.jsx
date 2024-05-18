import { Routes, Route, Outlet } from "react-router-dom";
import SignUp from "./pages/forms/SignUp";
import SignUpTourist from "./pages/forms/SignUpTourist";
import NavBar from "./components/navbar/NavBar";
import SignUpAgency from "./pages/forms/SignUpAgency";
import SingleTourPage from "./pages/Agency/SignleTour/SingleTourPage";
import ConfirmYourEmail from "./pages/forms/ConfirmYourEmail";
import AgencyTours from "./pages/Agency/Tours/AgencyTours";
import TravelPage from "./pages/Tourist/TravelPage/TravelPage";
import EditProfileLanguagePage from "./pages/Tourist/PaymentS/EditProfileLanguagePage";
import EditProfileNotificationsPage from "./pages/Tourist/PaymentS/EditProfileNotificationsPage";
import EditProfilePayment from "./pages/Tourist/PaymentS/EditProfilePayment";
import Login from "./pages/forms/login/Login";
import Modal from "react-modal";
import { Suspense, useState } from "react";
import AgencyNavbar from "./components/agency/navbar/AgencyNavbar";
import AgencyUpperSection from "./components/agency/upperSection/AgencyUpperSection";
import "/src/pages/Agency/Tours/agencyTours.css";
import Messages from "./pages/Agency/Massages/Messages";
import AgencyInfoPage from "./pages/Tourist/PaymentS/AgencyInfoPage";
import SingleTravelPage from "./pages/Tourist/Travels/SingleTravelPage";
import AgenciesHomePage from "./pages/Agency/AgencyHomePage/AgenciesHomePage";
Modal.setAppElement("#root");

function App() {
  const [createTour, setCreateTour] = useState(false);
  const [tourCreated, setTourCreated] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [seachInput, setSearchInput] = useState("");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }>
        <Route index element={<TravelPage />} />
        <Route path="/agencies" element={<AgenciesHomePage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signup/tourist" element={<SignUpTourist />} />
        <Route path="signup/agency" element={<SignUpAgency />} />
        <Route
          path="signup/confirmation/:type/:confirmationId"
          element={<ConfirmYourEmail />}
        />
        <Route path="/login" element={<Login />} />
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
        <Route path="settings/info" element={<AgencyInfoPage />} />
        <Route
          path="settings/notifications"
          element={<EditProfileNotificationsPage />}
        />
        <Route path="settings/payment" element={<EditProfilePayment />} />
        <Route path="settings/language" element={<EditProfileLanguagePage />} />
        <Route path="messages" element={<Messages />} />
      </Route>
      <Route path="/tours/:travelId" element={<SingleTravelPage />} />
    </Routes>
  );
}

export default App;
