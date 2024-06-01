import { Routes, Route, Outlet } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import Modal from "react-modal";
import AgencyUpperSection from "./components/agency/upperSection/AgencyUpperSection";
import CircularProgress from "@mui/material/CircularProgress";
import "/src/pages/Agency/Tours/agencyTours.css";

const NavBar = lazy(() => import("./components/navbar/NavBar"));
const AgencyNavbar = lazy(() =>
  import("./components/agency/navbar/AgencyNavbar")
);
const SignUp = lazy(() => import("./pages/forms/SignUp"));
const SignUpTourist = lazy(() => import("./pages/forms/SignUpTourist"));
const SignUpAgency = lazy(() => import("./pages/forms/SignUpAgency"));
const SingleTourPage = lazy(() =>
  import("./pages/Agency/SignleTour/SingleTourPage")
);
const ConfirmYourEmail = lazy(() => import("./pages/forms/ConfirmYourEmail"));
const AgencyTours = lazy(() => import("./pages/Agency/Tours/AgencyTours"));
const TravelPage = lazy(() => import("./pages/Tourist/TravelPage/TravelPage"));
const EditProfileLanguagePage = lazy(() =>
  import("./pages/Tourist/PaymentS/EditProfileLanguagePage")
);
const EditProfileNotificationsPage = lazy(() =>
  import("./pages/Tourist/PaymentS/EditProfileNotificationsPage")
);
const EditProfilePayment = lazy(() =>
  import("./pages/Tourist/PaymentS/EditProfilePayment")
);
const Login = lazy(() => import("./pages/forms/login/Login"));
const Messages = lazy(() => import("./pages/Agency/Massages/Messages"));
const AgencyInfoPage = lazy(() =>
  import("./pages/Tourist/PaymentS/AgencyInfoPage")
);
const SingleTravelPage = lazy(() =>
  import("./pages/Tourist/Travels/SingleTravelPage")
);
const AgenciesHomePage = lazy(() =>
  import("./pages/Agency/AgencyHomePage/AgenciesHomePage")
);

Modal.setAppElement("#root");

function App() {
  const [createTour, setCreateTour] = useState(false);
  const [tourCreated, setTourCreated] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [seachInput, setSearchInput] = useState("");

  return (
    <Suspense
      fallback={
        <div
          style={{ width: "100vw", display: "flex", justifyContent: "center" }}
          className="loading-container">
          <CircularProgress disableShrink />
        </div>
      }>
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
          <Route
            path="settings/language"
            element={<EditProfileLanguagePage />}
          />
          <Route path="messages" element={<Messages />} />
        </Route>
        <Route path="/tours/:travelId" element={<SingleTravelPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
