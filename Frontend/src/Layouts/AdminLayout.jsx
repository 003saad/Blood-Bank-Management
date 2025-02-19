import { useState } from "react";
import Navbar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import HomePage from "../Pages/AdminPage/HomePage";
import DonorPage from "../Pages/AdminPage/DonorPage";
import PatientPage from "../Pages/AdminPage/PatientPage";
import DonationsPage from "../Pages/AdminPage/DonationsPage";
import BloodRequestsPage from "../Pages/AdminPage/BloodRequestsPage";
import RequestHistoryPage from "../Pages/AdminPage/RequestHistoryPage";

export default function AdminLayout() {
  const [selectedItem, setSelectedItem] = useState("home");

  const renderPage = () => {
    switch (selectedItem) {
      case "home":
        return <HomePage />;
      case "donor":
        return <DonorPage />;
      case "patient":
        return <PatientPage />;
      case "donations":
        return <DonationsPage />;
      case "blood-requests":
        return <BloodRequestsPage />;
      case "request-history":
        return <RequestHistoryPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500/90 to-purple-400">
      <Sidebar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />

      {/* Main Content Area */}
      <main className="pl-16 pt-16">
        <div className="p-6">{renderPage()}</div>
      </main>
    </div>
  );
}
