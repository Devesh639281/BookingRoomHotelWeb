import "./App.css";
// import Layout from "./component/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./component/pages/Home";
import Login from "./component/pages/Login";
import Register from "./component/pages/Register";
import BookingScreen from "./component/pages/BookingScreen";
import ProfileScreen from "./component/pages/ProfileScreen";
import AdminPage from "./component/pages/AdminPage";
import LandingPage from "./component/pages/LandingPage";
// import Layout from "./component/Layout/Layout";

function App() {
  return (
    <>
      <>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/bookingScreen/:_id/:fromDate/:toDate"
            element={<BookingScreen />}
          />
          <Route exact path="/profile" element={<ProfileScreen />} />
          <Route exact path="/admin" element={<AdminPage />} />
          <Route exact path="/landing" element={<LandingPage />} />
        </Routes>
      </>
    </>
  );
}

export default App;
