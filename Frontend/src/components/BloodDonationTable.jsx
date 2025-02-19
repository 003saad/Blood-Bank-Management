import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig"; // Adjust the import path if necessary

const BloodDonationTable = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axiosInstance.get("/blood/donate"); // Replace with your actual endpoint
        setDonations(response.data.result); // Set the fetched data to the state
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError("Failed to load donations");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-white text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-500/90 to-purple-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Blood Donation Table
        </h2>
        <div className="overflow-x-auto bg-white/30 rounded-lg shadow-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="px-6 py-4 text-center">Donor ID</th>

                <th className="px-6 py-4 text-center">Request Date </th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-200">
                  <td className="px-6 py-4 text-center">{donation.id}</td>

                  <td className="px-6 py-4 text-center">{donation.req_date}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`${
                        donation.req_status === "Completed"
                          ? "text-green-500"
                          : donation.req_status === "Pending"
                          ? "text-yellow-500"
                          : "text-blue-500"
                      }`}
                    >
                      {donation.req_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BloodDonationTable;
