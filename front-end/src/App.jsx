import { Routes, Route, Outlet } from "react-router-dom";
import React, { Suspense, lazy, useState } from "react";
import Modal from "react-modal";
import CircularProgress from "@mui/material/CircularProgress";
import SearchPage from "./pages/Tourist/SearchPage/SearchPage";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
const AgencyUpperSection = lazy(() =>
  import("./components/agency/upperSection/AgencyUpperSection")
);
import("/src/pages/Agency/Tours/agencyTours.css");
const Transactions = lazy(() =>
  import("./pages/Tourist/PaymentS/Transactions")
);
const DeleteAccount = lazy(() =>
  import("./pages/Tourist/PaymentS/DeleteAccount")
);
const ChangePassword = lazy(() =>
  import("./pages/Tourist/PaymentS/ChangePassword")
);

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
const Chatbot = lazy(() => import("./components/chatbot/Chatbot"));

Modal.setAppElement("#root");

function App() {
  const [createTour, setCreateTour] = useState(false);
  const [tourCreated, setTourCreated] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [seachInput, setSearchInput] = useState("");
  const [chatbotOpened, setChatbotOpened] = useState(false);

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
              <Chatbot
                chatbotOpened={chatbotOpened}
                setChatbotOpened={setChatbotOpened}
              />
              <Outlet />
            </>
          }>
          <Route index element={<AgenciesHomePage />} />
          <Route path="/search/:searchedValue" element={<SearchPage />} />
          <Route path="/travels" element={<TravelPage />} />
          <Route path="/about" element={<About />} />
          <Route path="contact" element={<Contact />} />
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
          <Route path="settings/transactions" element={<Transactions />} />
          <Route path="settings/deleteAccount" element={<DeleteAccount />} />
          <Route path="settings/changePassword" element={<ChangePassword />} />
          <Route path="messages" element={<Messages />} />
        </Route>
        <Route path="/tours/:travelId" element={<SingleTravelPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
