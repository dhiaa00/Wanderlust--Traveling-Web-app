import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import SignUp from "./pages/forms/SignUp";
import SignUpTourist from "./pages/forms/SignUpTourist";
import NavBar from "./components/navbar/NavBar";

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
      </Route>
    </Routes>
  );
}

export default App;
