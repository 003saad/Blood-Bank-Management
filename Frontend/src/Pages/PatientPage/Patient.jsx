import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Path to Sidebar component
import BloodRequestForm from "../Forms/BloodRequestForm"; // Path to BloodRequestForm
import RequestedTable from "../../components/RequestedTable"; // Path to RequestedTable component

const Patient = () => {
  const [selectedItem, setSelectedItem] = useState("request"); // Default to "Request"

  return (
    <div className="flex">
      <Sidebar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />

      {/* Main content area */}
      <div className=" w-full">
        {/* Render content based on selected sidebar item */}
        {selectedItem === "request" ? <BloodRequestForm /> : <RequestedTable />}
      </div>
    </div>
  );
};

export default Patient;
