import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/NavBar";
import HomePage from "../Pages/HomePage/HomePage";
import AdminDashboard from "../Pages/AdminPage/DashBoard";
import PatientPage from "../Pages/AdminPage/PatientPage";
import Patient from "../Pages/PatientPage/Patient";
import DonatingPage from "../Pages/DonatePage/DonatePage";
import MainPage from "../Pages/DonatePage/MainPage";
import LoginForm from "../Pages/Forms/LoginForm";
import RegistrationForm from "../Pages/Forms/RegistrationForm";
import ProtectedRoute from "./ProtectedRoutes";

export default function AppRoutes() {
  return (
    <Router>
      {/* Navbar is present on all pages */}
      <Navbar />

      {/* Define Routes for each page */}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />

        <Route path="/" element={<HomePage />} />
        <Route
          path="/patient"
          element={
            <ProtectedRoute>
              {" "}
              <Patient />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor"
          element={
            <ProtectedRoute>
              {" "}
              <MainPage />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              {" "}
              <AdminDashboard />{" "}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
