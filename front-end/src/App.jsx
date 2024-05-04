import { Routes, Route, Outlet } from "react-router-dom";
import SignUp from "./pages/forms/SignUp";
import SignUpTourist from "./pages/forms/SignUpTourist";
import NavBar from "./components/navbar/NavBar";
import SignUpAgency from "./pages/forms/SignUpAgency";
import SingleTourPage from "./pages/Agency/SignleTour/SingleTourPage";
import ConfirmYourEmail from "./pages/forms/ConfirmYourEmail";
import AgencyTours from "./pages/Agency/Tours/AgencyTours";
import Login from "./pages/forms/login/Login";

function App() {
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
        path="/agency/:agencyId/tours/:tourId"
        element={<SingleTourPage />}
      />
      <Route path="/agency/:agencyId/tours" element={<AgencyTours />} />
    </Routes>
  );
}

export default App;
