import { Routes, Route, Outlet } from "react-router-dom";
import SignUp from "./pages/forms/SignUp";
import SignUpTourist from "./pages/forms/SignUpTourist";
import NavBar from "./components/navbar/NavBar";
import SignUpAgency from "./pages/forms/SignUpAgency";
import SingleTourPage from "./pages/Agency/SignleTour/SingleTourPage";
import ConfirmYourEmail from "./pages/forms/ConfirmYourEmail";

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
          path="confirmation/:confirmationId"
          element={<ConfirmYourEmail email={"test123@gmail.com"} />}
        />
      </Route>
      <Route path="/agencies/:agencyId" element={<SingleTourPage />} />
    </Routes>
  );
}

export default App;
