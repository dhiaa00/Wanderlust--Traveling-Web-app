import { Routes, Route, Outlet } from "react-router-dom";
import React, { Suspense, lazy, useEffect, useState } from "react";
import Modal from "react-modal";
import CircularProgress from "@mui/material/CircularProgress";
import SearchPage from "./pages/Tourist/SearchPage/SearchPage";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import { socket } from "./socket";
import axios from "axios";
import Notifications from "./components/notifications/Notifications";
const AgencyUpperSection = lazy(() =>
  import("./components/agency/upperSection/AgencyUpperSection")
);
import("/src/pages/Agency/Tours/agencyTours.css");
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
const ProfilePage = lazy(() => import("./pages/Tourist/PaymentS/ProfilePage"));
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

  // handling notifications

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(false);

  const getNotifications = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/notifications/${user._id}`,
        {
          withCredentials: true,
        }
      );
      setNotifications(response.data.notifications);
      setNewNotification(response.data.newNotifications);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    user && getNotifications();
    user && socket.emit("joinNotifications", user._id);
    user &&
      socket.on("newNotification", (notification) => {
        console.log("nooti", notification);
        setNewNotification(true);
        notification.message &&
          setNotifications([...notifications, notification]);
      });
  }, []);

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
              <NavBar
                setNotificationsOpen={setNotificationsOpen}
                notificationsOpen={notificationsOpen}
                newNotification={newNotification}
              />
              <Chatbot
                chatbotOpened={chatbotOpened}
                setChatbotOpened={setChatbotOpened}
              />
              <Outlet />
              {notificationsOpen && (
                <Notifications notifications={notifications} />
              )}
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
          <Route path="user/:userId/info" element={<ProfilePage />} />
          <Route
            path="user/:userId/notifications"
            element={<EditProfileNotificationsPage />}
          />
          <Route path="user/:userId/payment" element={<EditProfilePayment />} />
          <Route
            path="user/:userId/language"
            element={<EditProfileLanguagePage />}
          />
          <Route
            path="user/:userId/deleteAccount"
            element={<DeleteAccount />}
          />
          <Route
            path="user/:userId/changePassword"
            element={<ChangePassword />}
          />
          <Route
            path="/user/:userId/messages/:conversationId?"
            element={<Messages />}
          />
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
                  newNotification={newNotification}
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
                notificationsList={notifications}
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
          <Route path="settings/info" element={<ProfilePage />} />
          <Route
            path="settings/notifications"
            element={<EditProfileNotificationsPage />}
          />
          <Route path="settings/payment" element={<EditProfilePayment />} />
          <Route
            path="settings/language"
            element={<EditProfileLanguagePage />}
          />
          <Route path="settings/deleteAccount" element={<DeleteAccount />} />
          <Route path="settings/changePassword" element={<ChangePassword />} />
          <Route path="messages/:conversationId?" element={<Messages />} />
        </Route>
        <Route path="/tours/:travelId" element={<SingleTravelPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
