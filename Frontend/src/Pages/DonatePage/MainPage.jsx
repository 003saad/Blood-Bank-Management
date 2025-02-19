import { useState } from "react";
import Sidebar from "./Sidebar";
import DonatePage from "./DonatePage";
import HistoryPage from "./HistoryPage";
import BloodDonationTable from "../../components/BloodDonationTable";

const MainPage = () => {
  const [selectedItem, setSelectedItem] = useState("donate");

  const renderContent = () => {
    switch (selectedItem) {
      case "donate":
        return <DonatePage />;
      case "history":
        return <BloodDonationTable />;
      default:
        return <DonatePage />;
    }
  };

  return (
    <div className="flex">
      <Sidebar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <div className="flex-1 min-h-screen bg-gradient-to-b from-red-500/90 to-purple-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
